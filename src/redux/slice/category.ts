import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    list: [],
    isLoading: false,
  },
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
  },
});

export const {
  getCategoryListFetch,
  getCategoryListSuccess,
  getCategoryListFailure,
} = categorySlice.actions;

export const categoryState = (state: any) => state.category;
