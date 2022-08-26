import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	Category,
	CreateCategoryPayload,
	DeleteCategoryPayload,
	DeleteManyCategoriesPayload,
	GetCategoryQueryParams,
	UpdateCategoryPayload,
} from "interfaces/category";
import { GetAllResponse } from "interfaces/common";
import { RootState } from "redux/store";

interface CategoryState {
	list: Category[];
	isLoading: boolean;
	isError: boolean;
	current?: Category;
}

interface StateType {
	list: Category[];
	listSearch: Category[];
	isLoading: boolean;
	isError: boolean;
	isLoadingForm: boolean;
	isLoadingDelete: boolean;
	isLoadingSearch: boolean;
	current: Category | null;
	currentCategory: Category | null;
	navbar: CategoryState;
	newCategoryPage: CategoryState;
	productCategoryPage: CategoryState;
	categoryListSlug: CategoryState;
	categories: GetAllResponse<Category>;
}

const initialState: StateType = {
	isLoading: false,
	isError: false,
	categories: {
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
	currentCategory: null,
	navbar: {
		list: [],
		isLoading: false,
		isError: false,
	},
	newCategoryPage: {
		list: [],
		isLoading: false,
		isError: false,
	},
	productCategoryPage: {
		list: [],
		isLoading: false,
		isError: false,
	},
	categoryListSlug: {
		list: [],
		isLoading: false,
		isError: false,
	},
};
const name = "category";
export const categorySlice = createSlice({
	name,
	initialState,
	reducers: {
		getAllCategoriesFetch: (state, action: PayloadAction<GetCategoryQueryParams>) => {
			state.isLoading = true;
			state.isError = false;
		},
		getAllCategoriesSuccess: (state, action: PayloadAction<GetAllResponse<Category>>) => {
			state.isLoading = false;
			state.categories = action.payload;
		},
		getAllCategoriesFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		getCurrentCategory: (state, action: PayloadAction<Category | null>) => {
			if ((state.currentCategory && !action.payload) || (!state.currentCategory && action.payload)) {
				state.currentCategory = action.payload;
			}
		},
		createCategoryFetch: (state, action: PayloadAction<CreateCategoryPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		createCategorySuccess: (state, action: PayloadAction<Category>) => {
			state.isLoading = false;
			state.categories.items.unshift(action.payload);
			state.categories.count += 1;
		},
		createCategoryFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		updateCategoryFetch: (state, action: PayloadAction<UpdateCategoryPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		updateCategorySuccess: (state, action: PayloadAction<Category>) => {
			state.isLoading = false;
			const newData = action.payload;
			const index = state.categories.items.findIndex((item: Category) => item.id === newData.id);
			if (index !== -1) {
				state.categories.items[index] = {
					...state.categories.items[index],
					...newData,
				};
			}
		},
		updateCategoryFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		deleteCategoryFetch: (state, action: PayloadAction<DeleteCategoryPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		deleteCategorySuccess: (state, action: PayloadAction<number>) => {
			state.isLoading = false;
			const id = action.payload;
			state.categories.items = state.categories.items.filter((item: Category) => item.id !== id);
			state.categories.count -= 1;
		},
		deleteCategoryFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},
		deleteManyCategoryFetch: (state, action: PayloadAction<DeleteManyCategoriesPayload>) => {
			state.isLoading = true;
			state.isError = false;
		},
		deleteManyCategorySuccess: (state, action: PayloadAction<React.Key[]>) => {
			state.isLoading = false;
			const ids = action.payload;
			state.categories.items = state.categories.items.filter((item: Category) => !ids.includes(item.id));
			state.categories.count -= 1;
		},
		deleteManyCategoryFailure: (state) => {
			state.isError = true;
			state.isLoading = false;
		},

		getCategoryListNewCategoryPageFetch: (state, action: PayloadAction<any>) => {},
		getCategoryListNewCategoryPageSuccess: (state, action: PayloadAction<any>) => {},
		getCategoryListNewCategoryPageFailure: (state) => {},
		getCategoryListProductCategoryPageFetch: (state, action: PayloadAction<any>) => {},
		getCategoryListProductCategoryPageSuccess: (state, action: PayloadAction<any>) => {},
		getCategoryListProductCategoryPageFailure: (state) => {},
		getCategoryListFetch: (state) => {},
		getCategoryListSuccess: (state, action: PayloadAction<any>) => {},
		getCategoryListFailure: (state) => {},

		addCategoryNewCategoryPageFetch: (state, action: PayloadAction<any>) => {},
		addCategoryNewCategoryPageSuccess: (state, action: PayloadAction<any>) => {},
		addCategoryNewCategoryPageFailure: (state) => {},
		searchCategoryFetch: (state, action: PayloadAction<any>) => {},
		searchCategorySuccess: (state, action: PayloadAction<any>) => {},
		searchCategoryFailure: (state) => {},
		getCategoryListNavbarFetch: (state, action: PayloadAction<any>) => {},
		getCategoryListNavbarSuccess: (state, action: PayloadAction<any>) => {},
		getCategoryListNavbarFailure: (state) => {},
		getCategoryListSlugFetch: (state, action: PayloadAction<any>) => {},
		getCategoryListSlugSuccess: (state, action: PayloadAction<any>) => {},
		getCategoryListSlugFailure: (state) => {},
	},
});

export const categoryActions = categorySlice.actions;

export const getAllCategoriesAction = `${name}/getAllCategoriesFetch`;
export const createCategoryAction = `${name}/createCategoryFetch`;
export const updateCategoryAction = `${name}/updateCategoryFetch`;
export const deleteCategoryAction = `${name}/deleteCategoryFetch`;
export const deleteManyCategoryAction = `${name}/deleteManyCategoryFetch`;

export const categoryState = (state: RootState) => state.category;
