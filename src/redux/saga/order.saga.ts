import { PayloadAction } from "@reduxjs/toolkit";
import { getMyOrders, getOrders } from "api/orderApi";
import { CODE } from "constant";
import { GetAllOrdersPayload } from "interfaces/order";
import { call, put, takeEvery } from "redux-saga/effects";
import { getMyOrdersFetch, getOrdersFetch, orderActions } from "redux/slice/order.slice";

function* getOrdersSaga({ payload }: PayloadAction<GetAllOrdersPayload>): any {
	try {
		const { accessToken, dispatch, params } = payload;
		const res = yield call(() => getOrders(accessToken, dispatch, params));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(orderActions.getOrdersSuccess(data));
		} else {
			yield put(orderActions.getOrdersFailure());
		}
	} catch (error) {
		yield put(orderActions.getOrdersFailure());
	}
}
function* getMyOrdersSaga({ payload }: PayloadAction<GetAllOrdersPayload>): any {
	try {
		const { accessToken, dispatch, params } = payload;
		const res = yield call(() => getMyOrders(accessToken, dispatch, params));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(orderActions.getOrdersSuccess(data));
		} else {
			yield put(orderActions.getOrdersFailure());
		}
	} catch (error) {
		yield put(orderActions.getOrdersFailure());
	}
}
function* orderSaga() {
	yield takeEvery(getOrdersFetch, getOrdersSaga);
	yield takeEvery(getMyOrdersFetch, getMyOrdersSaga);
}

export default orderSaga;
