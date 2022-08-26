import { PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import * as metaApi from "api/metaApi";
import { STATUS_CODE } from "constant";
import { MetaPayload } from "interfaces/meta";
import { QueryParams, SearchParams } from "interfaces/common";
import { call, put, takeEvery } from "redux-saga/effects";
import { metaActions } from "redux/slice/meta";

function* workMetaListNewBannerFetch({
	payload,
}: PayloadAction<QueryParams>): any {
	try {
		const res = yield call(() => metaApi.getMetaList(payload));
		const { data, status } = res;

		if (status === STATUS_CODE.OK) {
			yield put(metaActions.getMetaListNewBannerSuccess(data.items));
		} else {
			yield put(metaActions.getMetaListNewBannerFailure());
		}
	} catch (error) {
		yield put(metaActions.getMetaListNewBannerFailure());
	}
}

function* workGetMetaListFetch({ payload }: PayloadAction<QueryParams>): any {
	try {
		const res = yield call(() => metaApi.getMetaList(payload));
		const { data, status } = res;

		if (status === STATUS_CODE.OK) {
			yield put(metaActions.getMetaListSuccess(data.items));
		} else {
			yield put(metaActions.getMetaListFailure());
		}
	} catch (error) {
		yield put(metaActions.getMetaListFailure());
	}
}

function* workGetMetaListSearchFetch({
	payload,
}: PayloadAction<SearchParams>): any {
	try {
		const res = yield call(() => metaApi.getMetaList(payload));
		const { data, status } = res;

		if (status === STATUS_CODE.OK) {
			yield put(metaActions.getMetaListSearchSuccess(data.items));
		} else {
			yield put(metaActions.getMetaListSearchFailure());
		}
	} catch (error) {
		yield put(metaActions.getMetaListSearchFailure());
	}
}

function* workAddMetaFetch({ payload }: PayloadAction<MetaPayload>): any {
	try {
		const { accessToken, dispatch, body, afterSuccess } = payload;
		const res = yield call(() =>
			metaApi.addMeta(accessToken, dispatch, body)
		);
		const { data, status } = res;

		if (status === STATUS_CODE.CREATED) {
			yield put(metaActions.addMetaSuccess(data));
			message.success("Add new meta success");
			afterSuccess && afterSuccess();
		} else {
			yield put(metaActions.addMetaFailure());
			message.error("Add new meta failure");
		}
	} catch (error) {
		yield put(metaActions.addMetaFailure());
		message.error("Add new meta failure");
	}
}

function* workUpdateMetaFetch({ payload }: PayloadAction<MetaPayload>): any {
	try {
		const { accessToken, dispatch, body, afterSuccess } = payload;
		const res = yield call(() =>
			metaApi.updateMeta(accessToken, dispatch, body)
		);
		const { data, status } = res;

		if (status === STATUS_CODE.OK) {
			yield put(metaActions.updateMetaSuccess(data));
			message.success("Update new meta success");
			afterSuccess && afterSuccess();
		} else {
			yield put(metaActions.updateMetaFailure());
			message.error("Update new meta failure");
		}
	} catch (error) {
		yield put(metaActions.updateMetaFailure());
		message.error("Update new meta failure");
	}
}

function* metaSaga() {
	yield takeEvery(
		"meta/getMetaListNewBannerFetch",
		workMetaListNewBannerFetch
	);
	yield takeEvery("meta/getMetaListFetch", workGetMetaListFetch);
	yield takeEvery("meta/addMetaFetch", workAddMetaFetch);
	yield takeEvery("meta/updateMetaFetch", workUpdateMetaFetch);
	yield takeEvery("meta/getMetaListSearchFetch", workGetMetaListSearchFetch);
}
export default metaSaga;
