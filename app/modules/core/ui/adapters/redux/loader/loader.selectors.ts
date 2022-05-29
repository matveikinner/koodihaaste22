import { RootState } from "@core/ui/frameworks/redux/redux.config";
import { LoaderState } from "./loader.types";

export const selectLoaderState = (state: RootState): LoaderState => state.core.loader;
