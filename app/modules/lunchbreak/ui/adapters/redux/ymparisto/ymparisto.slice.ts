import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { prop, uniqBy } from "ramda";
import { MetaStatusEnum } from "@core/domain/models";
import { Municipality } from "@lunchbreak/domain/models";
import { YMPARISTO_SLICE_KEY } from "./ymparisto.constants";
import { YmparistoState } from "./ymparisto.types";

const initialState: YmparistoState = {
  municipalities: [],
  meta: {
    status: MetaStatusEnum.IDLE,
    isError: false,
  },
};

export const ymparistoSlice = createSlice({
  name: YMPARISTO_SLICE_KEY,
  initialState,
  reducers: {
    getMunicipalitiesRequest: (state) => ({
      ...state,
      meta: { status: MetaStatusEnum.PENDING, isError: false },
    }),
    getMunicipalitiesSuccess: (state, action: PayloadAction<Municipality[]>) => ({
      municipalities: uniqBy(prop("name"))([...action.payload, ...state.municipalities]) as Municipality[],
      meta: { status: MetaStatusEnum.SUCCEEDED, isError: false },
    }),
    getMunicipalitiesFailure: (state) => ({
      ...state,
      meta: { status: MetaStatusEnum.FAILED, isError: true },
    }),
  },
});

export const { getMunicipalitiesRequest, getMunicipalitiesSuccess, getMunicipalitiesFailure } = ymparistoSlice.actions;

export default ymparistoSlice.reducer;
