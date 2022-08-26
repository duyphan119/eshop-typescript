import { PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import * as productOptionApi from "api/productOptionApi";
import { STATUS_CODE } from "constant";
import { GetExtraPayloadType } from "interfaces/common";
import { AddManyProductOptionPayload } from "interfaces/productOption";
import { call, put, takeEvery } from "redux-saga/effects";
import { productActions } from "redux/slice/product.slice";
import { productOptionActions } from "redux/slice/productOption";
function* workAddManyProductOption({ payload }: PayloadAction<AddManyProductOptionPayload>): any {
	const { accessToken, dispatch, productOptions, afterSuccess } = payload;
	try {
		const res = yield call(() => productOptionApi.createMany(accessToken, dispatch, productOptions));

		const { status } = res;
		if (status === STATUS_CODE.CREATED) {
			yield put(productOptionActions.addManyProductOptionSuccess());
			message.success("Create product options success");
			yield put(productActions.getSelectedListProductOption([]));
			// yield put(variantValueActions.getSelectedListProductOption([]));
			afterSuccess && afterSuccess();
		} else {
			yield put(productOptionActions.addManyProductOptionFailure());
			message.error("Create product options failure");
		}
	} catch (error) {
		yield put(productOptionActions.addManyProductOptionFailure());
		message.error("Create product options failure");
	}
}

function* workGetAllInventory({ payload }: PayloadAction<GetExtraPayloadType>): any {
	try {
		const { accessToken, dispatch, params } = payload;
		const res = yield call(() => productOptionApi.getAll(accessToken, dispatch, params));
		const { data, status } = res;
		if (status === STATUS_CODE.OK) {
			yield put(productOptionActions.getAllInventorySuccess(data.items));
		} else {
			yield put(productOptionActions.getAllInventoryFailure());
		}
	} catch (error) {
		yield put(productOptionActions.getAllInventoryFailure());
	}
}

function* productOptionSaga() {
	yield takeEvery("productOption/addManyProductOptionFetch", workAddManyProductOption);
	yield takeEvery("productOption/getAllInventoryFetch", workGetAllInventory);
}
export default productOptionSaga;
