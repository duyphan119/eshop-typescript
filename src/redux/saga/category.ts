import { PayloadAction } from "@reduxjs/toolkit";
import { createCategory, deleteCategory, deleteManyCategories, getAllCategories, updateCategory } from "api/categoryApi";
import { CODE } from "constant";
import { CreateCategoryPayload, DeleteCategoryPayload, DeleteManyCategoriesPayload, GetCategoryQueryParams, UpdateCategoryPayload } from "interfaces/category";
import { call, put, takeEvery } from "redux-saga/effects";
import {
	categoryActions,
	createCategoryAction,
	deleteCategoryAction,
	deleteManyCategoryAction,
	getAllCategoriesAction,
	updateCategoryAction,
} from "redux/slice/category";

function* getAllCategoriesSaga({ payload }: PayloadAction<GetCategoryQueryParams>): any {
	try {
		const res = yield call(() => getAllCategories(payload));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(categoryActions.getAllCategoriesSuccess(data));
		} else {
			yield put(categoryActions.getAllCategoriesFailure());
		}
	} catch (error) {
		yield put(categoryActions.getAllCategoriesFailure());
	}
}
function* createCategorySaga({ payload }: PayloadAction<CreateCategoryPayload>): any {
	try {
		const { accessToken, dispatch, data: reqData, onDone } = payload;
		const res = yield call(() => createCategory(accessToken, dispatch, reqData));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(categoryActions.createCategorySuccess(data));
			onDone && onDone();
		} else {
			yield put(categoryActions.createCategoryFailure());
		}
	} catch (error) {
		yield put(categoryActions.createCategoryFailure());
	}
}
function* updateCategorySaga({ payload }: PayloadAction<UpdateCategoryPayload>): any {
	try {
		const { accessToken, dispatch, data: reqData, id, onDone } = payload;
		const res = yield call(() => updateCategory(accessToken, dispatch, id, reqData));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(categoryActions.updateCategorySuccess(data));
			onDone && onDone();
		} else {
			yield put(categoryActions.updateCategoryFailure());
		}
	} catch (error) {
		yield put(categoryActions.updateCategoryFailure());
	}
}
function* deleteCategorySaga({ payload }: PayloadAction<DeleteCategoryPayload>): any {
	try {
		const { accessToken, dispatch, id, onDone } = payload;
		const res = yield call(() => deleteCategory(accessToken, dispatch, id));
		const { code } = res.data;
		if (code === CODE.OK) {
			yield put(categoryActions.deleteCategorySuccess(id));
			onDone && onDone();
		} else {
			yield put(categoryActions.deleteCategoryFailure());
		}
	} catch (error) {
		yield put(categoryActions.deleteCategoryFailure());
	}
}
function* deleteManyCategorySaga({ payload }: PayloadAction<DeleteManyCategoriesPayload>): any {
	try {
		const { accessToken, dispatch, onDone, ids } = payload;
		const res = yield call(() => deleteManyCategories(accessToken, dispatch, { ids }));
		const { code } = res.data;
		if (code === CODE.OK) {
			yield put(categoryActions.deleteManyCategorySuccess(ids));
			onDone && onDone();
		} else {
			yield put(categoryActions.deleteManyCategoryFailure());
		}
	} catch (error) {
		yield put(categoryActions.deleteManyCategoryFailure());
	}
}

function* categorySaga() {
	yield takeEvery(getAllCategoriesAction, getAllCategoriesSaga);
	yield takeEvery(createCategoryAction, createCategorySaga);
	yield takeEvery(updateCategoryAction, updateCategorySaga);
	yield takeEvery(deleteCategoryAction, deleteCategorySaga);
	yield takeEvery(deleteManyCategoryAction, deleteManyCategorySaga);
}

export default categorySaga;
