import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOAST_SLICE_KEY } from "./toast.constants";
import { ToastState } from "./toast.types";

const initialState: ToastState = {
  type: undefined,
  message: "",
};

export const toastSlice = createSlice({
  name: TOAST_SLICE_KEY,
  initialState,
  reducers: {
    createInfoToast: (state, action: PayloadAction<string>) => ({
      ...state,
      type: "info",
      message: action.payload,
    }),
    createSuccessToast: (state, action: PayloadAction<string>) => ({
      ...state,
      type: "success",
      message: action.payload,
    }),
    createWarningToast: (state, action: PayloadAction<string>) => ({
      ...state,
      type: "warning",
      message: action.payload,
    }),
    createErrorToast: (state, action: PayloadAction<string>) => ({
      ...state,
      type: "error",
      message: action.payload,
    }),
    resetToast: () => initialState,
  },
});

export const { createInfoToast, createSuccessToast, createWarningToast, createErrorToast, resetToast } =
  toastSlice.actions;

export default toastSlice.reducer;
