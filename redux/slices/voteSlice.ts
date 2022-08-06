import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "~/redux/store";
import { Vote } from "~/types/vote";

export interface VoteState {
	loading: boolean;
	error: boolean;
	list: Vote[];
	currentVote: Vote | null;
}

const initialState: VoteState = {
	loading: false,
	error: false,
	list: [],
	currentVote: null,
};

export const voteSlice = createSlice({
	name: "vote",
	initialState,
	reducers: {
		fetch: (state) => {
			state.loading = true;
			state.error = false;
		},
		error: (state) => {
			state.loading = false;
			state.error = true;
		},
		getVotes: (state, action: PayloadAction<Vote[]>) => {
			state.list = action.payload;
			state.loading = false;
		},
		getCurrentVote: (state, action: PayloadAction<Vote>) => {
			state.currentVote = action.payload;
			state.loading = false;
		},
		createVote: (state, action: PayloadAction<Vote>) => {
			state.list.unshift(action.payload);
			state.loading = false;
		},
		updateVote: (state, action: PayloadAction<Vote>) => {
			const data = action.payload;
			const index = state.list.findIndex(
				(item: Vote) => item.id === data.id
			);
			if (index !== -1) {
				state.currentVote = data;
				state.list[index] = data;
			}
			state.loading = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const voteActions = voteSlice.actions;

export const voteState = (state: RootState) => state.vote;

export default voteSlice.reducer;
