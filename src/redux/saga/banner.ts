import { BannerPayload } from "interfaces/banner";
import { PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import * as bannerApi from "api/bannerApi";
import { STATUS_CODE } from "constant";
import { BannerQuery } from "interfaces/banner";
import { QueryParams, SearchParams } from "interfaces/common";
import { call, put, takeEvery } from "redux-saga/effects";
import { bannerActions } from "redux/slice/banner";

function* workGetBannerListSliderFetch({
	payload,
}: PayloadAction<BannerQuery>): any {
	try {
		const res = yield call(() => bannerApi.getBannerByMetaName(payload));
		const { data, status } = res;
		if (status === STATUS_CODE.OK) {
			yield put(bannerActions.getBannerListSliderSuccess(data.items));
		} else {
			yield put(bannerActions.getBannerListSliderFailure());
		}
	} catch (error) {
		yield put(bannerActions.getBannerListSliderFailure());
	}
}
function* workGetBannerListFetch({ payload }: PayloadAction<QueryParams>): any {
	try {
		const res = yield call(() => bannerApi.getBannerList(payload));
		const { data, status } = res;

		if (status === STATUS_CODE.OK) {
			yield put(bannerActions.getBannerListSuccess(data.items));
		} else {
			yield put(bannerActions.getBannerListFailure());
		}
	} catch (error) {
		yield put(bannerActions.getBannerListFailure());
	}
}

function* workGetBannerListSearchFetch({
	payload,
}: PayloadAction<SearchParams>): any {
	try {
		const res = yield call(() => bannerApi.getBannerList(payload));
		const { data, status } = res;

		if (status === STATUS_CODE.OK) {
			yield put(bannerActions.getBannerListSearchSuccess(data.items));
		} else {
			yield put(bannerActions.getBannerListSearchFailure());
		}
	} catch (error) {
		yield put(bannerActions.getBannerListSearchFailure());
	}
}

function* workAddBannerFetch({ payload }: PayloadAction<BannerPayload>): any {
	try {
		const { accessToken, dispatch, body, afterSuccess } = payload;
		const res = yield call(() =>
			bannerApi.addBanner(accessToken, dispatch, body)
		);
		const { data, status } = res;

		if (status === STATUS_CODE.CREATED) {
			yield put(bannerActions.addBannerSuccess(data));
			message.success("Add new banner success");
			afterSuccess && afterSuccess();
		} else {
			yield put(bannerActions.addBannerFailure());
			message.error("Add new banner failure");
		}
	} catch (error) {
		yield put(bannerActions.addBannerFailure());
		message.error("Add new banner failure");
	}
}

function* workUpdateBannerFetch({
	payload,
}: PayloadAction<BannerPayload>): any {
	try {
		const { accessToken, dispatch, body, afterSuccess } = payload;
		const res = yield call(() =>
			bannerApi.updateBanner(accessToken, dispatch, body)
		);
		const { data, status } = res;
		console.log(res);

		if (status === STATUS_CODE.OK) {
			yield put(bannerActions.updateBannerSuccess(data));
			message.success("Update new banner success");
			afterSuccess && afterSuccess();
		} else {
			yield put(bannerActions.updateBannerFailure());
			message.error("Update new banner failure");
		}
	} catch (error) {
		yield put(bannerActions.updateBannerFailure());
		message.error("Update new banner failure");
	}
}

function* bannerSaga() {
	yield takeEvery(
		"banner/getBannerListSliderFetch",
		workGetBannerListSliderFetch
	);
	yield takeEvery("banner/getBannerListFetch", workGetBannerListFetch);
	yield takeEvery("banner/addBannerFetch", workAddBannerFetch);
	yield takeEvery("banner/updateBannerFetch", workUpdateBannerFetch);
	yield takeEvery(
		"banner/getBannerListSearchFetch",
		workGetBannerListSearchFetch
	);
}
export default bannerSaga;
