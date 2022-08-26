import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchState, QueryParams } from "interfaces/common";
import { GetVotePayload, Vote, VotePayload } from "interfaces/vote";

interface VoteListState extends FetchState {
	list: Vote[];
	current: Vote | null;
}

interface ProductDetailPage extends FetchState {
	list: Vote[];
}

interface StateType {
	voteList: VoteListState;
	productDetailPage: ProductDetailPage;
}

const initialState: StateType = {
	voteList: {
		list: [],
		isLoading: false,
		isError: false,
		current: null,
	},
	productDetailPage: {
		list: [],
		isLoading: false,
		isError: false,
	},
};
export const voteSlice = createSlice({
	name: "vote",
	initialState,
	reducers: {
		getVoteListFetch: (state, action: PayloadAction<QueryParams>) => {
			state.voteList.isLoading = true;
			state.voteList.isError = false;
		},
		getVoteListSuccess: (state, action: PayloadAction<Vote[]>) => {
			state.voteList.isLoading = false;
			state.voteList.list = action.payload;
		},
		getVoteListFailure: (state) => {
			state.voteList.isLoading = false;
			state.voteList.isError = true;
		},
		getVoteListProductDetailPageFetch: (
			state,
			action: PayloadAction<GetVotePayload>
		) => {
			state.productDetailPage.isLoading = true;
			state.productDetailPage.isError = false;
		},
		getVoteListProductDetailPageSuccess: (
			state,
			action: PayloadAction<Vote[]>
		) => {
			state.productDetailPage.isLoading = false;
			state.productDetailPage.list = action.payload;
		},
		getVoteListProductDetailPageFailure: (state) => {
			state.productDetailPage.isLoading = false;
			state.productDetailPage.isError = true;
		},
		getCurrent: (state, action: PayloadAction<Vote | null>) => {
			state.voteList.current = action.payload;
		},
		addVoteProductDetailPageFetch: (
			state,
			action: PayloadAction<VotePayload>
		) => {
			state.productDetailPage.isLoading = true;
			state.productDetailPage.isError = false;
		},
		addVoteProductDetailPageSuccess: (
			state,
			action: PayloadAction<Vote>
		) => {
			state.productDetailPage.list = [
				action.payload,
				...state.productDetailPage.list,
			];
			state.productDetailPage.isLoading = false;
		},
		addVoteProductDetailPageFailure: (state) => {
			state.productDetailPage.isLoading = false;
			state.productDetailPage.isError = true;
		},
		addVoteFetch: (state, action: PayloadAction<VotePayload>) => {
			state.voteList.isLoading = true;
			state.voteList.isError = false;
		},
		addVoteSuccess: (state, action: PayloadAction<Vote>) => {
			state.voteList.list = [action.payload, ...state.voteList.list];
			state.voteList.isLoading = false;
		},
		addVoteFailure: (state) => {
			state.voteList.isLoading = false;
			state.voteList.isError = true;
		},
		updateVoteFetch: (state, action: PayloadAction<VotePayload>) => {
			state.voteList.isLoading = true;
			state.voteList.isError = false;
		},
		updateVoteSuccess: (state, action: PayloadAction<Vote>) => {
			const data = action.payload;
			const index = state.voteList.list.findIndex(
				(item: Vote) => item.id === data.id
			);
			if (index !== -1) {
				state.voteList.list[index] = {
					...state.voteList.list[index],
					...data,
				};
			}
			state.voteList.isLoading = false;
		},
		updateVoteFailure: (state) => {
			state.voteList.isLoading = false;
			state.voteList.isError = true;
		},
	},
});

export const voteActions = voteSlice.actions;

export const voteState = (state: RootState) => state.vote;
