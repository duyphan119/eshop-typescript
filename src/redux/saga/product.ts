import { PayloadAction } from "@reduxjs/toolkit";
import { createProduct, deleteProduct, deleteManyProducts, getAllProducts, updateProduct } from "api/productApi";
import { CODE } from "constant";
import { CreateProductPayload, DeleteProductPayload, DeleteManyProductsPayload, GetProductQueryParams, UpdateProductPayload } from "interfaces/product";
import { call, put, takeEvery } from "redux-saga/effects";
import {
	productActions,
	createProductAction,
	deleteProductAction,
	deleteManyProductsAction,
	getAllProductsAction,
	updateProductAction,
} from "redux/slice/product.slice";

function* getAllProductsSaga({ payload }: PayloadAction<GetProductQueryParams>): any {
	try {
		const res = yield call(() => getAllProducts(payload));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(productActions.getAllProductsSuccess(data));
		} else {
			yield put(productActions.getAllProductsFailure());
		}
	} catch (error) {
		yield put(productActions.getAllProductsFailure());
	}
}
function* createProductSaga({ payload }: PayloadAction<CreateProductPayload>): any {
	try {
		const { accessToken, dispatch, data: reqData, onDone } = payload;
		const res = yield call(() => createProduct(accessToken, dispatch, reqData));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(productActions.createProductSuccess(data));
			onDone && onDone();
		} else {
			yield put(productActions.createProductFailure());
		}
	} catch (error) {
		yield put(productActions.createProductFailure());
	}
}
function* updateProductSaga({ payload }: PayloadAction<UpdateProductPayload>): any {
	try {
		const { accessToken, dispatch, data: reqData, id, onDone } = payload;
		const res = yield call(() => updateProduct(accessToken, dispatch, id, reqData));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(productActions.updateProductSuccess(data));
			onDone && onDone();
		} else {
			yield put(productActions.updateProductFailure());
		}
	} catch (error) {
		yield put(productActions.updateProductFailure());
	}
}
function* deleteProductSaga({ payload }: PayloadAction<DeleteProductPayload>): any {
	try {
		const { accessToken, dispatch, id, onDone } = payload;
		const res = yield call(() => deleteProduct(accessToken, dispatch, id));
		const { code } = res.data;
		if (code === CODE.OK) {
			yield put(productActions.deleteProductSuccess(id));
			onDone && onDone();
		} else {
			yield put(productActions.deleteProductFailure());
		}
	} catch (error) {
		yield put(productActions.deleteProductFailure());
	}
}
function* deleteManyProductSaga({ payload }: PayloadAction<DeleteManyProductsPayload>): any {
	try {
		const { accessToken, dispatch, onDone, ids } = payload;
		const res = yield call(() => deleteManyProducts(accessToken, dispatch, { ids }));
		const { code } = res.data;
		if (code === CODE.OK) {
			yield put(productActions.deleteManyProductsSuccess(ids));
			onDone && onDone();
		} else {
			yield put(productActions.deleteManyProductsFailure());
		}
	} catch (error) {
		yield put(productActions.deleteManyProductsFailure());
	}
}

function* ProductSaga() {
	yield takeEvery(getAllProductsAction, getAllProductsSaga);
	yield takeEvery(createProductAction, createProductSaga);
	yield takeEvery(updateProductAction, updateProductSaga);
	yield takeEvery(deleteProductAction, deleteProductSaga);
	yield takeEvery(deleteManyProductsAction, deleteManyProductSaga);
}

export default ProductSaga;
