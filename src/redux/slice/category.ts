import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../interfaces/category";

interface StateType {
  list: Category[];
  listSearch: Category[];
  isLoading: boolean;
  isLoadingForm: boolean;
  isLoadingDelete: boolean;
  isLoadingSearch: boolean;
  current: Category | null;
}

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    list: [],
    listSearch: [],
    isLoading: false,
    isLoadingForm: false,
    isLoadingDelete: false,
    isLoadingSearch: false,
    current: null,
  } as StateType,
  reducers: {
    getCategoryListFetch: (state) => {
      state.isLoading = true;
    },
    getCategoryListSuccess: (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    },
    getCategoryListFailure: (state) => {
      state.isLoading = false;
    },
    getCurrentCategory: (state, action) => {
      state.current = action.payload;
    },
    addCategoryFetch: (state, action) => {
      state.isLoadingForm = true;
    },
    addCategorySuccess: (state, action) => {
      state.list = [action.payload, ...state.list];
      state.isLoadingForm = false;
    },
    addCategoryFailure: (state) => {
      state.isLoadingForm = false;
    },
    updateCategoryFetch: (state, action) => {
      state.isLoadingForm = true;
    },
    updateCategorySuccess: (state, action) => {
      const data = action.payload;
      const index = state.list.findIndex((item) => item.id === data.id);
      state.list[index] = { ...state.list[index], ...data };
      state.isLoadingForm = false;
    },
    updateCategoryFailure: (state) => {
      state.isLoadingForm = false;
    },
    deleteCategoryFetch: (state, action) => {
      state.isLoadingDelete = true;
    },
    deleteCategorySuccess: (state, action) => {
      const id = action.payload;
      state.list = state.list.filter((item) => item.id !== id);
      state.isLoadingDelete = false;
    },
    deleteCategoryFailure: (state) => {
      state.isLoadingDelete = false;
    },
    deleteManyCategoryFetch: (state, action) => {
      state.isLoadingDelete = true;
    },
    deleteManyCategorySuccess: (state, action) => {
      const listId = action.payload;
      state.list = state.list.filter(
        (item) => listId.findIndex((ite: number) => ite === item.id) === -1
      );
      state.isLoadingDelete = false;
    },
    deleteManyCategoryFailure: (state) => {
      state.isLoadingDelete = false;
    },
    searchCategoryFetch: (state, action) => {
      state.isLoadingSearch = true;
    },
    searchCategorySuccess: (state, action) => {
      state.listSearch = action.payload;
      state.isLoadingSearch = false;
    },
    searchCategoryFailure: (state) => {
      state.isLoadingSearch = false;
    },
  },
});

export const {
  getCategoryListFetch,
  getCategoryListSuccess,
  getCategoryListFailure,
  getCurrentCategory,
  addCategoryFetch,
  addCategorySuccess,
  addCategoryFailure,
  updateCategoryFetch,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryFetch,
  deleteCategorySuccess,
  deleteCategoryFailure,
  deleteManyCategoryFetch,
  deleteManyCategorySuccess,
  deleteManyCategoryFailure,
  searchCategoryFetch,
  searchCategorySuccess,
  searchCategoryFailure,
} = categorySlice.actions;

export const categoryState = (state: any) => state.category;
