import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { prop, uniqBy } from "ramda";
import { MetaStatusEnum } from "@core/domain/models";
import { Result } from "@lunchbreak/domain/models";
import { RESULTS_SLICE_KEY } from "./results.constants";
import { ResultsState } from "./results.types";

const initialState: ResultsState = {
  results: [],
  meta: {
    status: MetaStatusEnum.IDLE,
    isError: false,
  },
};

export const resultsSlice = createSlice({
  name: RESULTS_SLICE_KEY,
  initialState,
  reducers: {
    getResultsRequest: (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      meta: { status: MetaStatusEnum.PENDING, isError: false },
    }),
    getResultsSuccess: (state, action: PayloadAction<{ date: string; results: Result[] }>) => ({
      results: uniqBy(prop("date"))([action.payload, ...state.results]) as { date: string; results: Result[] }[],
      meta: { status: MetaStatusEnum.SUCCEEDED, isError: false },
    }),
    getResultsFailure: (state) => ({
      ...state,
      meta: { status: MetaStatusEnum.FAILED, isError: true },
    }),
    getResultsWithRestaurantsRequest: (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      meta: { status: MetaStatusEnum.PENDING, isError: false },
    }),
    getResultsWithRestaurantsSuccess: (state, action: PayloadAction<{ date: string; results: Result[] }>) => ({
      results: uniqBy(prop("date"))([action.payload, ...state.results]) as { date: string; results: Result[] }[],
      meta: { status: MetaStatusEnum.SUCCEEDED, isError: false },
    }),
    getResultsWithRestaurantsFailure: (state) => ({
      ...state,
      meta: { status: MetaStatusEnum.FAILED, isError: true },
    }),
  },
});

export const {
  getResultsRequest,
  getResultsSuccess,
  getResultsFailure,
  getResultsWithRestaurantsRequest,
  getResultsWithRestaurantsSuccess,
  getResultsWithRestaurantsFailure,
} = resultsSlice.actions;

export default resultsSlice.reducer;
