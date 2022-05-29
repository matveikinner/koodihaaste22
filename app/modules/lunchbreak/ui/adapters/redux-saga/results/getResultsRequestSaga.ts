import { put } from "@redux-saga/core/effects";
import { lastValueFrom, Observable } from "rxjs";
import { PayloadAction } from "@reduxjs/toolkit";
import lunchbreakContainer from "@lunchbreak/di/lunchbreak.container";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import { Result } from "@lunchbreak/domain/models";
import GetResultsUseCase from "@lunchbreak/domain/usecases/getResultsUseCase";
import { getResultsFailure, getResultsSuccess } from "../../redux/results/results.slice";

export function* getResultsRequestSaga({ payload }: PayloadAction<string | undefined>) {
  const getResultsUseCase = lunchbreakContainer.get<GetResultsUseCase>(LUNCHBREAK_BINDINGS.GetResultsUseCase);

  try {
    const { date, results } = (yield lastValueFrom(
      (yield getResultsUseCase.invoke(payload)) as Observable<{ date: string; results: Result[] }>
    )) as { date: string; results: Result[] };
    yield put(getResultsSuccess({ date, results }));
  } catch (err) {
    yield put(getResultsFailure());
    console.error(err);
    // Re-throw error for exception handler
    throw err;
  }
}
