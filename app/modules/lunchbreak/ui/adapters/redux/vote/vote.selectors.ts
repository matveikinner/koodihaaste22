import { RootState } from "@core/ui/frameworks/redux/redux.config";
import { VoteState } from "./vote.types";

export const selectVoteState = (state: RootState): VoteState => state.lunchbreak.vote;
