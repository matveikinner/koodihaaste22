import { put, select } from "@redux-saga/core/effects";
import { lastValueFrom, Observable } from "rxjs";
import { PayloadAction } from "@reduxjs/toolkit";
import { t } from "i18next";
import { createErrorToast, createSuccessToast } from "@core/ui/adapters/redux/toast/toast.slice";
import lunchbreakContainer from "@lunchbreak/di/lunchbreak.container";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import SubmitVoteUseCase from "@lunchbreak/domain/usecases/submitVoteUseCase";
import { submitVoteFailure, submitVoteSuccess } from "../../redux/vote/vote.slice";
import { VoteState } from "../../redux/vote/vote.types";
import { selectVoteState } from "../../redux/vote/vote.selectors";

export function* submitVoteRequestSaga({ payload: restaurantId }: PayloadAction<string>) {
  const submitVoteUseCase = lunchbreakContainer.get<SubmitVoteUseCase>(LUNCHBREAK_BINDINGS.SubmitVoteUseCase);

  try {
    const statusCode = (yield lastValueFrom(
      (yield submitVoteUseCase.invoke(restaurantId)) as Observable<number>
    )) as number;

    const { alreadyVoted } = (yield select(selectVoteState)) as VoteState;

    if (statusCode === 200) {
      if (alreadyVoted) {
        yield put(submitVoteSuccess(null));
        yield put(createSuccessToast(`${t(["core:shared.vote.update", "error:translations.notExistingKey"])}`));
      } else {
        yield put(submitVoteSuccess(restaurantId));
        yield put(createSuccessToast(`${t(["core:shared.vote.save", "error:translations.notExistingKey"])}`));
      }
    } else if (statusCode === 400) {
      yield put(createErrorToast(`${t(["error:solidabisErrors.400", "error:apiErrors.unknown"])}`));
      yield put(submitVoteFailure());
    } else yield put(submitVoteFailure());
  } catch (err) {
    yield put(submitVoteFailure());
    throw err;
  }
}
