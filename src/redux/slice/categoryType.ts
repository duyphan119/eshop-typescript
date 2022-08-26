import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	CategoryType,
	CreateCategoryTypePayload,
	DeleteCategoryTypePayload,
	DeleteManyCategoryTypesPayload,
	GetCategoryTypeQueryParams,
	UpdateCategoryTypePayload,
} from "interfaces/categoryType";
import { GetAllResponse } from "interfaces/common";
import { RootState } from "redux/store";

interface CategoryTypeState {
	list: CategoryType[];
	isLoading: boolean;
	isError: boolean;
	current?: CategoryType;
}

interface StateType {
	list: CategoryType[];
	listSearch: CategoryType[];
	isLoading: boolean;
	isError: boolean;
	isLoadingForm: boolean;
	isLoadingDelete: boolean;
	isLoadingSearch: boolean;
	current: CategoryType | null;
	currentCategoryType: CategoryType | null;
	navbar: CategoryTypeState;
	newCategoryTypePage: CategoryTypeState;
	productCategoryTypePage: CategoryTypeState;
	categoryTypeListSlug: CategoryTypeState;
	categoryTypes: GetAllResponse<CategoryType>;
}

const initialState: StateType = {
	isLoading: false,
	isError: false,
	categoryTypes: {
		items: [],
		count: 0,
		totalPage: 0,
	},
	list: [],
	listSearch: [],
	isLoadingForm: false,
	isLoadingDelete: false,
	isLoadingSearch: false,
	current: null,
	currentCategoryType: null,
	navbar: {
		list: [],
		isLoading: false,
		isError: false,
	},
	newCategoryTypePage: {
		list: [],
		isLoading: false,
		isError: false,
	},
	productCategoryTypePage: {
		list: [],
		isLoading: false,
		isError: false,
	},
	categoryTypeListSlug: {
		list: [],
		isLoading: false,
		isError: false,
	},
};
const name = "categoryType";
export const categoryTypeSlice = createSlice({
	name,
	initialState,
	reducers: {
		getAllCategoryTypesFetch: (state, action: PayloadAction<GetCategoryTypeQueryParams>) => {
			state.isLoading = true;
			state.isError = false;
		},
		getAllCategoryTypesSuccess: (state, action: PayloadAction<GetAllResponse<CategoryType>>) => {
			state.isLoading = false;
			state.categoryTypes = action.payload;
		},
		getAllCategoryTypesFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		getCurrentCategoryType: (state, action: PayloadAction<CategoryType | null>) => {
			if ((state.currentCategoryType && !action.payload) || (!state.currentCategoryType && action.payload)) {
				state.currentCategoryType = action.payload;
			}
		},
		createCategoryTypeFetch: (state, action: PayloadAction<CreateCategoryTypePayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		createCategoryTypeSuccess: (state, action: PayloadAction<CategoryType>) => {
			state.isLoading = false;
			state.categoryTypes.items.unshift(action.payload);
			state.categoryTypes.count += 1;
		},
		createCategoryTypeFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		updateCategoryTypeFetch: (state, action: PayloadAction<UpdateCategoryTypePayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		updateCategoryTypeSuccess: (state, action: PayloadAction<CategoryType>) => {
			state.isLoading = false;
			const newData = action.payload;
			const index = state.categoryTypes.items.findIndex((item: CategoryType) => item.id === newData.id);
			if (index !== -1) {
				state.categoryTypes.items[index] = {
					...state.categoryTypes.items[index],
					...newData,
				};
			}
		},
		updateCategoryTypeFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		deleteCategoryTypeFetch: (state, action: PayloadAction<DeleteCategoryTypePayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		deleteCategoryTypeSuccess: (state, action: PayloadAction<number>) => {
			state.isLoading = false;
			const id = action.payload;
			state.categoryTypes.items = state.categoryTypes.items.filter((item: CategoryType) => item.id !== id);
			state.categoryTypes.count -= 1;
		},
		deleteCategoryTypeFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		deleteManyCategoryTypeFetch: (state, action: PayloadAction<DeleteManyCategoryTypesPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		deleteManyCategoryTypeSuccess: (state, action: PayloadAction<React.Key[]>) => {
			state.isLoading = false;
			const ids = action.payload;
			state.categoryTypes.items = state.categoryTypes.items.filter((item: CategoryType) => !ids.includes(item.id));
			state.categoryTypes.count -= 1;
		},
		deleteManyCategoryTypeFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
	},
});

export const categoryTypeActions = categoryTypeSlice.actions;

export const getAllCategoryTypesAction = `${name}/getAllCategoryTypesFetch`;
export const createCategoryTypeAction = `${name}/createCategoryTypeFetch`;
export const updateCategoryTypeAction = `${name}/updateCategoryTypeFetch`;
export const deleteCategoryTypeAction = `${name}/deleteCategoryTypeFetch`;
export const deleteManyCategoryTypeAction = `${name}/deleteManyCategoryTypeFetch`;

export const categoryTypeState = (state: RootState) => state.categoryType;
