import { PayloadAction } from "@reduxjs/toolkit";
import { createVariantValue, deleteManyVariantValues, deleteVariantValue, getAllVariantValues, updateVariantValue } from "api/variantValueApi";
import { CODE } from "constant";
import {
	CreateVariantValuePayload,
	DeleteManyVariantValuesPayload,
	DeleteVariantValuePayload,
	GetVariantValueQueryParams,
	UpdateVariantValuePayload,
} from "interfaces/variantValue";
import { call, put, takeEvery } from "redux-saga/effects";
import {
	createVariantValueAction,
	deleteManyVariantValueAction,
	deleteVariantValueAction,
	getAllVariantValuesAction,
	updateVariantValueAction,
	variantValueActions,
} from "redux/slice/variantValue";

function* getAllVariantValuesSaga({ payload }: PayloadAction<GetVariantValueQueryParams>): any {
	try {
		const res = yield call(() => getAllVariantValues(payload));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(variantValueActions.getAllVariantValuesSuccess(data));
		} else {
			yield put(variantValueActions.getAllVariantValuesFailure());
		}
	} catch (error) {
		yield put(variantValueActions.getAllVariantValuesFailure());
	}
}
function* createVariantValueSaga({ payload }: PayloadAction<CreateVariantValuePayload>): any {
	try {
		const { accessToken, dispatch, data: reqData, onDone } = payload;
		const res = yield call(() => createVariantValue(accessToken, dispatch, reqData));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(variantValueActions.createVariantValueSuccess(data));
			onDone && onDone();
		} else {
			yield put(variantValueActions.createVariantValueFailure());
		}
	} catch (error) {
		yield put(variantValueActions.createVariantValueFailure());
	}
}
function* updateVariantValueSaga({ payload }: PayloadAction<UpdateVariantValuePayload>): any {
	try {
		const { accessToken, dispatch, data: reqData, id, onDone } = payload;
		const res = yield call(() => updateVariantValue(accessToken, dispatch, id, reqData));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(variantValueActions.updateVariantValueSuccess(data));
			onDone && onDone();
		} else {
			yield put(variantValueActions.updateVariantValueFailure());
		}
	} catch (error) {
		yield put(variantValueActions.updateVariantValueFailure());
	}
}
function* deleteVariantValueSaga({ payload }: PayloadAction<DeleteVariantValuePayload>): any {
	try {
		const { accessToken, dispatch, id, onDone } = payload;
		const res = yield call(() => deleteVariantValue(accessToken, dispatch, id));
		const { code } = res.data;
		if (code === CODE.OK) {
			yield put(variantValueActions.deleteVariantValueSuccess(id));
			onDone && onDone();
		} else {
			yield put(variantValueActions.deleteVariantValueFailure());
		}
	} catch (error) {
		yield put(variantValueActions.deleteVariantValueFailure());
	}
}
function* deleteManyVariantValueSaga({ payload }: PayloadAction<DeleteManyVariantValuesPayload>): any {
	try {
		const { accessToken, dispatch, onDone, ids } = payload;
		const res = yield call(() => deleteManyVariantValues(accessToken, dispatch, { ids }));
		const { code } = res.data;
		if (code === CODE.OK) {
			yield put(variantValueActions.deleteManyVariantValueSuccess(ids));
			onDone && onDone();
		} else {
			yield put(variantValueActions.deleteManyVariantValueFailure());
		}
	} catch (error) {
		yield put(variantValueActions.deleteManyVariantValueFailure());
	}
}

function* variantValueSaga() {
	yield takeEvery(getAllVariantValuesAction, getAllVariantValuesSaga);
	yield takeEvery(createVariantValueAction, createVariantValueSaga);
	yield takeEvery(updateVariantValueAction, updateVariantValueSaga);
	yield takeEvery(deleteVariantValueAction, deleteVariantValueSaga);
	yield takeEvery(deleteManyVariantValueAction, deleteManyVariantValueSaga);
}

export default variantValueSaga;
