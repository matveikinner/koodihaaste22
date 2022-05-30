import { put } from "@redux-saga/core/effects";
import { lastValueFrom, Observable } from "rxjs";
import { PayloadAction } from "@reduxjs/toolkit";
import lunchbreakContainer from "@lunchbreak/di/lunchbreak.container";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import { Restaurant, Result } from "@lunchbreak/domain/models";
import GetResultsWithRestaurantsUseCase from "@lunchbreak/domain/usecases/getResultsWithRestaurantsUseCase";
import { getResultsWithRestaurantsFailure, getResultsWithRestaurantsSuccess } from "../../redux/results/results.slice";
import { updateRestaurants } from "../../redux/restaurants/restaurants.slice";
import { setVote } from "../../redux/vote/vote.slice";

export function* getResultsWithRestaurantsRequestSaga({ payload }: PayloadAction<string | undefined>) {
  const getResultsWithRestaurantsUseCase = lunchbreakContainer.get<GetResultsWithRestaurantsUseCase>(
    LUNCHBREAK_BINDINGS.GetResultsWithRestaurantsUseCase
  );

  try {
    const {
      date,
      results,
      alreadyVoted,
      restaurants = [],
    } = (yield lastValueFrom(
      (yield getResultsWithRestaurantsUseCase.invoke(payload)) as Observable<{
        date: string;
        results: Result[];
        alreadyVoted: string | null;
        restaurants: Restaurant[];
      }>
    )) as { date: string; results: Result[]; alreadyVoted: string | null; restaurants: Restaurant[] };

    yield put(getResultsWithRestaurantsSuccess({ date, results }));
    yield put(updateRestaurants(restaurants));
    yield put(setVote({ alreadyVoted, date }));
  } catch (err) {
    yield put(getResultsWithRestaurantsFailure());
    // Re-throw error for exception handler
    throw err;
  }
}
