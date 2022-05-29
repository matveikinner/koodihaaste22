import { RootState } from "@core/ui/frameworks/redux/redux.config";
import { ResultsState } from "./results.types";

export const selectResultsState = (state: RootState): ResultsState => state.lunchbreak.results;
