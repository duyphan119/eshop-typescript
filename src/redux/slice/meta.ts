import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchState, QueryParams, SearchParams } from "interfaces/common";
import { Meta, MetaPayload } from "interfaces/meta";

interface newBannerState extends FetchState {
	list: Meta[];
}

interface MetaList extends FetchState {
	list: Meta[];
	listSearch: Meta[];
	current: Meta | null;
}

interface StateType {
	newBanner: newBannerState;
	metaList: MetaList;
}

const initialState: StateType = {
	newBanner: {
		list: [],
		isLoading: false,
		isError: false,
	},
	metaList: {
		list: [],
		listSearch: [],
		isLoading: false,
		isError: false,
		current: null,
	},
};
export const metaSlice = createSlice({
	name: "meta",
	initialState,
	reducers: {
		getMetaListNewBannerFetch: (
			state,
			action: PayloadAction<QueryParams>
		) => {
			state.newBanner.isLoading = true;
			state.newBanner.isError = false;
		},
		getMetaListNewBannerSuccess: (state, action: PayloadAction<Meta[]>) => {
			state.newBanner.isLoading = false;
			state.newBanner.list = action.payload;
		},
		getMetaListNewBannerFailure: (state) => {
			state.newBanner.isLoading = false;
			state.newBanner.isError = true;
		},
		getMetaListFetch: (state, action: PayloadAction<QueryParams>) => {
			state.metaList.isLoading = true;
			state.metaList.isError = false;
		},
		getMetaListSuccess: (state, action: PayloadAction<Meta[]>) => {
			state.metaList.isLoading = false;
			state.metaList.list = action.payload;
		},
		getMetaListFailure: (state) => {
			state.metaList.isLoading = false;
			state.metaList.isError = true;
		},
		getMetaListSearchFetch: (
			state,
			action: PayloadAction<SearchParams>
		) => {
			state.metaList.isLoading = true;
			state.metaList.isError = false;
		},
		getMetaListSearchSuccess: (state, action: PayloadAction<Meta[]>) => {
			state.metaList.isLoading = false;
			state.metaList.listSearch = action.payload;
		},
		getMetaListSearchFailure: (state) => {
			state.metaList.isLoading = false;
			state.metaList.isError = true;
		},
		addMetaFetch: (state, action: PayloadAction<MetaPayload>) => {
			state.metaList.isLoading = true;
			state.metaList.isError = false;
		},
		addMetaSuccess: (state, action: PayloadAction<Meta>) => {
			state.metaList.isLoading = false;
			state.metaList.list = [action.payload, ...state.metaList.list];
		},
		addMetaFailure: (state) => {
			state.metaList.isLoading = false;
			state.metaList.isError = true;
		},
		updateMetaFetch: (state, action: PayloadAction<MetaPayload>) => {
			state.metaList.isLoading = true;
			state.metaList.isError = false;
		},
		updateMetaSuccess: (state, action: PayloadAction<Meta>) => {
			state.metaList.isLoading = false;
			const index: number = state.metaList.list.findIndex(
				(item: Meta) => item.id === action.payload.id
			);
			if (index !== -1) {
				state.metaList.list[index] = {
					...state.metaList.list[index],
					...action.payload,
				};
			}
		},
		updateMetaFailure: (state) => {
			state.metaList.isLoading = false;
			state.metaList.isError = true;
		},
		getCurrentMeta: (state, action: PayloadAction<Meta | null>) => {
			state.metaList.current = action.payload;
		},
	},
});

export const metaActions = metaSlice.actions;

export const metaState = (state: RootState) => state.meta;
