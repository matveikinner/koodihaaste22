import { RootState } from "@core/ui/frameworks/redux/redux.config";
import { ToastState } from "./toast.types";

export const selectToastState = (state: RootState): ToastState => state.core.toast;
