import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { authSlice } from "./slice/auth.slice";
import { categorySlice } from "./slice/category";
import { productSlice } from "./slice/product.slice";
import { bannerSlice } from "./slice/banner";
import { categoryTypeSlice } from "./slice/categoryType";
import { variantSlice } from "./slice/variant";
import { variantValueSlice } from "./slice/variantValue";
import { productOptionSlice } from "./slice/productOption";
import { voteSlice } from "./slice/vote";
import { metaSlice } from "./slice/meta";
import { cartSlice } from "./slice/cart";
import { wishlistSlice } from "./slice/wishlist";
import { userSlice } from "./slice/user";
import { messageSlice } from "./slice/message";
import categorySaga from "./saga/category";
import authSaga from "./saga/auth.saga";
import productSaga from "./saga/product";
import bannerSaga from "./saga/banner";
import categoryTypeSaga from "./saga/categoryType";
import variantSaga from "./saga/variant";
import variantValueSaga from "./saga/variantValue";
import voteSaga from "./saga/vote";
import productOptionSaga from "./saga/productOption";
import metaSaga from "./saga/meta";
import cartSaga from "./saga/cart";
import userSaga from "./saga/user";
import { orderSlice } from "./slice/order.slice";
import orderSaga from "./saga/order.saga";
const saga = createSagaMiddleware();
export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		category: categorySlice.reducer,
		product: productSlice.reducer,
		banner: bannerSlice.reducer,
		categoryType: categoryTypeSlice.reducer,
		variant: variantSlice.reducer,
		variantValue: variantValueSlice.reducer,
		productOption: productOptionSlice.reducer,
		vote: voteSlice.reducer,
		meta: metaSlice.reducer,
		cart: cartSlice.reducer,
		wishlist: wishlistSlice.reducer,
		user: userSlice.reducer,
		message: messageSlice.reducer,
		order: orderSlice.reducer,
	},
	middleware: [saga],
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const runSaga = () => {
	saga.run(authSaga);
	saga.run(categorySaga);
	saga.run(productSaga);
	saga.run(bannerSaga);
	saga.run(categoryTypeSaga);
	saga.run(variantSaga);
	saga.run(variantValueSaga);
	saga.run(productOptionSaga);
	saga.run(voteSaga);
	saga.run(metaSaga);
	saga.run(cartSaga);
	saga.run(userSaga);
	saga.run(orderSaga);
};
