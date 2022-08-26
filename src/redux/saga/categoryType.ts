import { PayloadAction } from "@reduxjs/toolkit";
import { createCategoryType, deleteCategoryType, deleteManyCategoryTypes, getAllCategoryTypes, updateCategoryType } from "api/categoryTypeApi";
import { CODE } from "constant";
import {
	CreateCategoryTypePayload,
	DeleteCategoryTypePayload,
	DeleteManyCategoryTypesPayload,
	GetCategoryTypeQueryParams,
	UpdateCategoryTypePayload,
} from "interfaces/categoryType";
import { call, put, takeEvery } from "redux-saga/effects";
import {
	categoryTypeActions,
	createCategoryTypeAction,
	deleteCategoryTypeAction,
	deleteManyCategoryTypeAction,
	getAllCategoryTypesAction,
	updateCategoryTypeAction,
} from "redux/slice/categoryType";

function* getAllCategoryTypesSaga({ payload }: PayloadAction<GetCategoryTypeQueryParams>): any {
	try {
		const res = yield call(() => getAllCategoryTypes(payload));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(categoryTypeActions.getAllCategoryTypesSuccess(data));
		} else {
			yield put(categoryTypeActions.getAllCategoryTypesFailure());
		}
	} catch (error) {
		yield put(categoryTypeActions.getAllCategoryTypesFailure());
	}
}
function* createCategoryTypeSaga({ payload }: PayloadAction<CreateCategoryTypePayload>): any {
	try {
		const { accessToken, dispatch, data: reqData, onDone } = payload;
		const res = yield call(() => createCategoryType(accessToken, dispatch, reqData));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(categoryTypeActions.createCategoryTypeSuccess(data));
			onDone && onDone();
		} else {
			yield put(categoryTypeActions.createCategoryTypeFailure());
		}
	} catch (error) {
		yield put(categoryTypeActions.createCategoryTypeFailure());
	}
}
function* updateCategoryTypeSaga({ payload }: PayloadAction<UpdateCategoryTypePayload>): any {
	try {
		const { accessToken, dispatch, data: reqData, id, onDone } = payload;
		const res = yield call(() => updateCategoryType(accessToken, dispatch, id, reqData));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(categoryTypeActions.updateCategoryTypeSuccess(data));
			onDone && onDone();
		} else {
			yield put(categoryTypeActions.updateCategoryTypeFailure());
		}
	} catch (error) {
		yield put(categoryTypeActions.updateCategoryTypeFailure());
	}
}
function* deleteCategoryTypeSaga({ payload }: PayloadAction<DeleteCategoryTypePayload>): any {
	try {
		const { accessToken, dispatch, id, onDone } = payload;
		const res = yield call(() => deleteCategoryType(accessToken, dispatch, id));
		const { code } = res.data;
		if (code === CODE.OK) {
			yield put(categoryTypeActions.deleteCategoryTypeSuccess(id));
			onDone && onDone();
		} else {
			yield put(categoryTypeActions.deleteCategoryTypeFailure());
		}
	} catch (error) {
		yield put(categoryTypeActions.deleteCategoryTypeFailure());
	}
}
function* deleteManyCategoryTypeSaga({ payload }: PayloadAction<DeleteManyCategoryTypesPayload>): any {
	try {
		const { accessToken, dispatch, onDone, ids } = payload;
		const res = yield call(() => deleteManyCategoryTypes(accessToken, dispatch, { ids }));
		const { code } = res.data;
		if (code === CODE.OK) {
			yield put(categoryTypeActions.deleteManyCategoryTypeSuccess(ids));
			onDone && onDone();
		} else {
			yield put(categoryTypeActions.deleteManyCategoryTypeFailure());
		}
	} catch (error) {
		yield put(categoryTypeActions.deleteManyCategoryTypeFailure());
	}
}

function* categoryTypeSaga() {
	yield takeEvery(getAllCategoryTypesAction, getAllCategoryTypesSaga);
	yield takeEvery(createCategoryTypeAction, createCategoryTypeSaga);
	yield takeEvery(updateCategoryTypeAction, updateCategoryTypeSaga);
	yield takeEvery(deleteCategoryTypeAction, deleteCategoryTypeSaga);
	yield takeEvery(deleteManyCategoryTypeAction, deleteManyCategoryTypeSaga);
}

export default categoryTypeSaga;
