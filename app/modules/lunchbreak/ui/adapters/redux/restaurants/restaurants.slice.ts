import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { prop, uniqBy } from "ramda";
import { MetaStatusEnum } from "@core/domain/models";
import { Restaurant } from "@lunchbreak/domain/models";
import { RESTAURANTS_SLICE_KEY } from "./restaurants.constants";
import { RestaurantState } from "./restaurants.types";

const initialState: RestaurantState = {
  restaurants: [],
  meta: {
    status: MetaStatusEnum.IDLE,
    isError: false,
  },
};

export const restaurantsSlice = createSlice({
  name: RESTAURANTS_SLICE_KEY,
  initialState,
  reducers: {
    getRestaurantsRequest: (state, action: PayloadAction<string>) => ({
      ...state,
      meta: { status: MetaStatusEnum.PENDING, isError: false },
    }),
    getRestaurantsSuccess: (state, action: PayloadAction<Restaurant[]>) => ({
      restaurants: uniqBy(prop("name"))([...action.payload, ...state.restaurants]) as Restaurant[],
      meta: { status: MetaStatusEnum.SUCCEEDED, isError: false },
    }),
    getRestaurantsFailure: (state) => ({
      ...state,
      meta: { status: MetaStatusEnum.FAILED, isError: true },
    }),
    updateRestaurants: (state, action: PayloadAction<Restaurant[]>) => ({
      restaurants: uniqBy(prop("name"))([...action.payload, ...state.restaurants]) as Restaurant[],
      meta: { status: MetaStatusEnum.SUCCEEDED, isError: false },
    }),
  },
});

export const { getRestaurantsRequest, getRestaurantsSuccess, getRestaurantsFailure, updateRestaurants } =
  restaurantsSlice.actions;

export default restaurantsSlice.reducer;
