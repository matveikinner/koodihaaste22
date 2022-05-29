import { createSlice } from "@reduxjs/toolkit";
import { LOADER_SLICE_KEY } from "./loader.constants";
import { LoaderState } from "./loader.types";

const initialState: LoaderState = {
  isActive: false,
  tasks: 0,
};

export const loaderSlice = createSlice({
  name: LOADER_SLICE_KEY,
  initialState,
  reducers: {
    createLoader: (state) => {
      state.isActive = true;
      state.tasks = state.tasks + 1;
    },
    removeLoader: (state) => {
      state.isActive = state.tasks > 1;
      state.tasks = state.tasks - 1;
    },
  },
});

export const { createLoader, removeLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
