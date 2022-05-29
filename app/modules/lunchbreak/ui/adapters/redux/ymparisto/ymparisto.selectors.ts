import { RootState } from "@core/ui/frameworks/redux/redux.config";
import { YmparistoState } from "./ymparisto.types";

export const selectYmparistoState = (state: RootState): YmparistoState => state.lunchbreak.ymparisto;
