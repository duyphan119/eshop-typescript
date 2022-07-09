import { authSlice } from "./slice/auth";
import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "./slice/category";
import createSagaMiddleware from "@redux-saga/core";
import categorySaga from "./saga/category";
import authSaga from "./saga/auth";
const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: [saga],
});
export const runSaga = () => {
  saga.run(categorySaga);
  saga.run(authSaga);
};
