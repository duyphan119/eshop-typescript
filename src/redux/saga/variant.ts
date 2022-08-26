import { PayloadAction } from "@reduxjs/toolkit";
import { createVariant, deleteManyVariants, deleteVariant, getAllVariants, updateVariant } from "api/variantApi";
import { CODE } from "constant";
import { CreateVariantPayload, DeleteManyVariantsPayload, DeleteVariantPayload, GetVariantQueryParams, UpdateVariantPayload } from "interfaces/variant";
import { call, put, takeEvery } from "redux-saga/effects";
import {
	createVariantAction,
	deleteManyVariantAction,
	deleteVariantAction,
	getAllVariantsAction,
	updateVariantAction,
	variantActions,
} from "redux/slice/variant";

function* getAllVariantsSaga({ payload }: PayloadAction<GetVariantQueryParams>): any {
	try {
		const res = yield call(() => getAllVariants(payload));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(variantActions.getAllVariantsSuccess(data));
		} else {
			yield put(variantActions.getAllVariantsFailure());
		}
	} catch (error) {
		yield put(variantActions.getAllVariantsFailure());
	}
}
function* createVariantSaga({ payload }: PayloadAction<CreateVariantPayload>): any {
	try {
		const { accessToken, dispatch, data: reqData, onDone } = payload;
		const res = yield call(() => createVariant(accessToken, dispatch, reqData));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(variantActions.createVariantSuccess(data));
			onDone && onDone();
		} else {
			yield put(variantActions.createVariantFailure());
		}
	} catch (error) {
		yield put(variantActions.createVariantFailure());
	}
}
function* updateVariantSaga({ payload }: PayloadAction<UpdateVariantPayload>): any {
	try {
		const { accessToken, dispatch, data: reqData, id, onDone } = payload;
		const res = yield call(() => updateVariant(accessToken, dispatch, id, reqData));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(variantActions.updateVariantSuccess(data));
			onDone && onDone();
		} else {
			yield put(variantActions.updateVariantFailure());
		}
	} catch (error) {
		yield put(variantActions.updateVariantFailure());
	}
}
function* deleteVariantSaga({ payload }: PayloadAction<DeleteVariantPayload>): any {
	try {
		const { accessToken, dispatch, id, onDone } = payload;
		const res = yield call(() => deleteVariant(accessToken, dispatch, id));
		const { code } = res.data;
		if (code === CODE.OK) {
			yield put(variantActions.deleteVariantSuccess(id));
			onDone && onDone();
		} else {
			yield put(variantActions.deleteVariantFailure());
		}
	} catch (error) {
		yield put(variantActions.deleteVariantFailure());
	}
}
function* deleteManyVariantSaga({ payload }: PayloadAction<DeleteManyVariantsPayload>): any {
	try {
		const { accessToken, dispatch, onDone, ids } = payload;
		const res = yield call(() => deleteManyVariants(accessToken, dispatch, { ids }));
		const { code } = res.data;
		if (code === CODE.OK) {
			yield put(variantActions.deleteManyVariantSuccess(ids));
			onDone && onDone();
		} else {
			yield put(variantActions.deleteManyVariantFailure());
		}
	} catch (error) {
		yield put(variantActions.deleteManyVariantFailure());
	}
}

function* variantSaga() {
	yield takeEvery(getAllVariantsAction, getAllVariantsSaga);
	yield takeEvery(createVariantAction, createVariantSaga);
	yield takeEvery(updateVariantAction, updateVariantSaga);
	yield takeEvery(deleteVariantAction, deleteVariantSaga);
	yield takeEvery(deleteManyVariantAction, deleteManyVariantSaga);
}

export default variantSaga;
