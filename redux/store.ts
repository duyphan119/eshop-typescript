import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import voteReducer from "./slices/voteSlice";
import categoryReducer from "./slices/categorySlice";
export const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
		order: orderReducer,
		category: categoryReducer,
		vote: voteReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
