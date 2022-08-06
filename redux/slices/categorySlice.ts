import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "~/redux/store";
import { Category } from "~/types/category";

export interface CategoryState {
	loading: boolean;
	error: boolean;
	list: Category[];
}

const initialState: CategoryState = {
	loading: false,
	error: false,
	list: [],
};

export const categorySlice = createSlice({
	name: "category",
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
		getCategories: (state, action: PayloadAction<Category[]>) => {
			state.list = action.payload;
			state.loading = false;
		},
		createCategory: (state, action: PayloadAction<Category>) => {
			state.list.unshift(action.payload);
			state.loading = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const categoryActions = categorySlice.actions;

export const categoryState = (state: RootState) => state.category;

export default categorySlice.reducer;
