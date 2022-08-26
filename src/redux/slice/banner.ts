import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Banner, BannerPayload, BannerQuery } from "interfaces/banner";
import { FetchState, QueryParams, SearchParams } from "interfaces/common";
import { RootState } from "redux/store";

export interface Slider extends FetchState {
	list: Banner[];
}

export interface BannerList extends FetchState {
	list: Banner[];
	listSearch: Banner[];
	current: Banner | null;
}
interface StateType {
	slider: Slider;
	bannerList: BannerList;
}

const initialState: StateType = {
	slider: {
		list: [],
		isLoading: false,
		isError: false,
	},
	bannerList: {
		list: [],
		listSearch: [],
		isLoading: false,
		isError: false,
		current: null,
	},
};

export const bannerSlice = createSlice({
	name: "banner",
	initialState,
	reducers: {
		getBannerListSliderFetch: (
			state,
			action: PayloadAction<BannerQuery>
		) => {
			state.slider.isLoading = true;
			state.slider.isError = false;
		},
		getBannerListSliderSuccess: (
			state,
			action: PayloadAction<Banner[]>
		) => {
			state.slider.isLoading = false;
			state.slider.list = action.payload;
		},
		getBannerListSliderFailure: (state) => {
			state.slider.isLoading = false;
			state.slider.isError = true;
		},
		getBannerListFetch: (state, action: PayloadAction<QueryParams>) => {
			state.bannerList.isLoading = true;
			state.bannerList.isError = false;
		},
		getBannerListSuccess: (state, action: PayloadAction<Banner[]>) => {
			state.bannerList.isLoading = false;
			state.bannerList.list = action.payload;
		},
		getBannerListFailure: (state) => {
			state.bannerList.isLoading = false;
			state.bannerList.isError = true;
		},
		getBannerListSearchFetch: (
			state,
			action: PayloadAction<SearchParams>
		) => {
			state.bannerList.isLoading = true;
			state.bannerList.isError = false;
		},
		getBannerListSearchSuccess: (
			state,
			action: PayloadAction<Banner[]>
		) => {
			state.bannerList.isLoading = false;
			state.bannerList.listSearch = action.payload;
		},
		getBannerListSearchFailure: (state) => {
			state.bannerList.isLoading = false;
			state.bannerList.isError = true;
		},
		addBannerFetch: (state, action: PayloadAction<BannerPayload>) => {
			state.bannerList.isLoading = true;
			state.bannerList.isError = false;
		},
		addBannerSuccess: (state, action: PayloadAction<Banner>) => {
			state.bannerList.isLoading = false;
			state.bannerList.list = [action.payload, ...state.bannerList.list];
		},
		addBannerFailure: (state) => {
			state.bannerList.isLoading = false;
			state.bannerList.isError = true;
		},
		updateBannerFetch: (state, action: PayloadAction<BannerPayload>) => {
			state.bannerList.isLoading = true;
			state.bannerList.isError = false;
		},
		updateBannerSuccess: (state, action: PayloadAction<Banner>) => {
			state.bannerList.isLoading = false;
			const index: number = state.bannerList.list.findIndex(
				(item: Banner) => item.id === action.payload.id
			);
			if (index !== -1) {
				state.bannerList.list[index] = {
					...state.bannerList.list[index],
					...action.payload,
				};
			}
		},
		updateBannerFailure: (state) => {
			state.bannerList.isLoading = false;
			state.bannerList.isError = true;
		},
		getCurrentBanner: (state, action: PayloadAction<Banner | null>) => {
			state.bannerList.current = action.payload;
		},
	},
});

export const bannerActions = bannerSlice.actions;

export const bannerState = (state: RootState) => state.banner;
