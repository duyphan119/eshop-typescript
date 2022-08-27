import { PayloadAction } from "@reduxjs/toolkit";
import * as cartItemApi from "api/cartItemApi";
import { CreateCartItemPayload } from "interfaces/cartItem";
import { GetExtraPayloadType } from "interfaces/common";
import { call, put, takeEvery } from "redux-saga/effects";
import { cartActions } from "redux/slice/cart.slice";

function* workGetCartFetch({ payload }: PayloadAction<GetExtraPayloadType>): any {
	try {
		const { accessToken, dispatch, params } = payload;
		const res = yield call(() => cartItemApi.getAllCartItems(accessToken, dispatch, params));
		const { data, code } = res.data;

		if (code === 1) {
			yield put(cartActions.getCartSuccess({ cartItems: data.items, count: data.count }));
		} else {
			yield put(cartActions.getCartFailure());
		}
	} catch (error) {
		yield put(cartActions.getCartFailure());
	}
}
function* workAddToCartFetch({ payload }: PayloadAction<CreateCartItemPayload>): any {
	try {
		const { accessToken, dispatch, data, onDone } = payload;
		const res = yield call(() => cartItemApi.createCartItem(accessToken, dispatch, data));
		const { code, data: _data } = res.data;

		if (code === 1) {
			yield put(cartActions.addToCartSuccess(_data));
			onDone && onDone();
		} else {
			yield put(cartActions.addToCartFailure());
		}
	} catch (error) {
		yield put(cartActions.addToCartFailure());
	}
}
// function* workRemoveCartItemFetch({ payload }: PayloadAction<CartItemPayload>): any {
// 	try {
// 		const { accessToken, dispatch, body, afterSuccess } = payload;
// 		const res = yield call(() => cartItemApi.deleteById(accessToken, dispatch, body));
// 		const { data, status } = res;

// 		if (status === STATUS_CODE.OK) {
// 			yield put(cartActions.removeItemSuccess(data));
// 			afterSuccess && afterSuccess();
// 		} else {
// 			yield put(cartActions.removeItemFailure());
// 		}
// 	} catch (error) {
// 		yield put(cartActions.removeItemFailure());
// 	}
// }
// function* workUpdateQuantityFetch({ payload }: PayloadAction<CartItemPayload>): any {
// 	try {
// 		const { accessToken, dispatch, body } = payload;
// 		const res = yield call(() => cartItemApi.update(accessToken, dispatch, body));
// 		const { data, status } = res;

// 		if (status === STATUS_CODE.OK) {
// 			yield put(cartActions.updateQuantitySuccess(data));
// 		} else {
// 			yield put(cartActions.updateQuantityFailure());
// 		}
// 	} catch (error) {
// 		yield put(cartActions.updateQuantityFailure());
// 	}
// }

function* cartSaga() {
	yield takeEvery("cart/getCartFetch", workGetCartFetch);
	yield takeEvery("cart/addToCartFetch", workAddToCartFetch);
	// yield takeEvery("cart/removeItemFetch", workRemoveCartItemFetch);
	// yield takeEvery("cart/updateQuantityFetch", workUpdateQuantityFetch);
}
export default cartSaga;
