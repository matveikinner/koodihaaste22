import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vote } from "@lunchbreak/domain/models";
import { VOTE_SLICE_KEY } from "./vote.constants";
import { VoteState } from "./vote.types";

const initialState: VoteState = {
  alreadyVoted: null,
  date: "",
};

export const voteSlice = createSlice({
  name: VOTE_SLICE_KEY,
  initialState,
  reducers: {
    submitVoteRequest: (state, action: PayloadAction<string>) => state,
    submitVoteSuccess: (state, action: PayloadAction<string | null>) => ({
      ...state,
      alreadyVoted: action.payload,
    }),
    submitVoteFailure: (state) => state,
    setVote: (state, action: PayloadAction<Vote>) => action.payload,
  },
});

export const { submitVoteRequest, submitVoteSuccess, submitVoteFailure, setVote } = voteSlice.actions;

export default voteSlice.reducer;
