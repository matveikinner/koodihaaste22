import { put } from "@redux-saga/core/effects";
import { lastValueFrom, Observable } from "rxjs";
import { PayloadAction } from "@reduxjs/toolkit";
import lunchbreakContainer from "@lunchbreak/di/lunchbreak.container";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import { Restaurant, Vote } from "@lunchbreak/domain/models";
import GetRestaurantsUseCase from "@lunchbreak/domain/usecases/getRestaurantsUseCase";
import { getRestaurantsFailure, getRestaurantsSuccess } from "../../redux/restaurants/restaurants.slice";
import { setVote } from "../../redux/vote/vote.slice";

export function* getRestaurantsRequestSaga({ payload }: PayloadAction<string>) {
  const getRestaurantsUseCase = lunchbreakContainer.get<GetRestaurantsUseCase>(
    LUNCHBREAK_BINDINGS.GetRestaurantsUseCase
  );

  try {
    const { alreadyVoted, date, restaurants } = (yield lastValueFrom(
      (yield getRestaurantsUseCase.invoke(payload)) as Observable<
        Vote & {
          restaurants: Restaurant[];
        }
      >
    )) as Vote & { restaurants: Restaurant[] };
    yield put(getRestaurantsSuccess(restaurants));
    yield put(setVote({ alreadyVoted, date }));
  } catch (err) {
    yield put(getRestaurantsFailure());
    console.error(err);
    // Re-throw error for exception handler
    throw err;
  }
}
