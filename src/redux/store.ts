import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "./slice/category";
import createSagaMiddleware from "@redux-saga/core";
const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
  },
  middleware: [saga],
});
