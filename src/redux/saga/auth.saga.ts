import { PayloadAction } from "@reduxjs/toolkit";
import * as authApi from "api/authApi";
import config from "config";
import { CODE, STATUS_CODE } from "constant";
import { EditProfilePayload, LoginPayload, RegisterPayload } from "interfaces/auth";
import { call, put, takeEvery } from "redux-saga/effects";
import { authActions, editProfileAction, getMeAction, loginAction, logoutAction, registerAction } from "redux/slice/auth.slice";
import { ExtraPayloadType, NavigatePayload } from "interfaces/common";

function* loginWork({ payload }: PayloadAction<LoginPayload>): any {
	try {
		const { navigate, body } = payload;
		const res = yield call(() => authApi.login(body));
		const { data, status } = res;
		if (status === STATUS_CODE.OK) {
			yield put(authActions.loginSuccess(data.data));
			yield put(authActions.getMeSuccess(data.data.user));
			console.log(data.data.user.roles);
			navigate &&
				navigate(data.data.user.roles.findIndex((item: any) => item.role?.name === "ADMIN") !== -1 ? config.routes.dashboard : config.routes.home);
		} else {
			yield put(authActions.loginFailure());
		}
	} catch (error) {
		yield put(authActions.loginFailure());
	}
}

function* registerWork({ payload }: PayloadAction<RegisterPayload>): any {
	try {
		const { navigate, body } = payload;
		const res = yield call(() => authApi.register(body));
		const { data, status } = res;
		console.log(status, STATUS_CODE.CREATED);
		if (status === STATUS_CODE.CREATED) {
			yield put(authActions.registerSuccess(data));
			yield put(authActions.getMeSuccess(data));
			navigate && navigate(config.routes.home);
		} else {
			yield put(authActions.registerFailure());
		}
	} catch (error) {
		yield put(authActions.registerFailure());
	}
}

function* getMeWork({ payload }: PayloadAction<ExtraPayloadType>): any {
	try {
		const { accessToken, dispatch } = payload;
		if (accessToken) {
			const res = yield call(() => authApi.getMe(accessToken, dispatch));
			const { data, status } = res;
			if (status === STATUS_CODE.OK) {
				yield put(authActions.getMeSuccess(data.data));
			} else {
				yield put(authActions.getMeFailure());
			}
		} else {
			yield put(authActions.getMeFailure());
		}
	} catch (error) {
		yield put(authActions.getMeFailure());
	}
}

function* logoutWork({ payload }: PayloadAction<NavigatePayload>): any {
	try {
		const { navigate } = payload;
		const res = yield call(() => authApi.logout());
		const { status } = res;
		if (status === STATUS_CODE.OK) {
			yield put(authActions.logoutSuccess());
			navigate && navigate(config.routes.login);
		} else {
			yield put(authActions.logoutFailure());
		}
	} catch (error) {
		yield put(authActions.logoutFailure());
	}
}
function* editProfileWork({ payload }: PayloadAction<EditProfilePayload>): any {
	try {
		const { accessToken, dispatch, data: reqData, onDone } = payload;
		const res = yield call(() => authApi.editProfile(accessToken, dispatch, reqData));
		const { code, data } = res.data;
		if (code === CODE.OK) {
			yield put(authActions.editProfileSuccess(data));
			onDone && onDone();
		} else {
			yield put(authActions.editProfileFailure());
		}
	} catch (error) {
		yield put(authActions.editProfileFailure());
	}
}
function* authSaga() {
	yield takeEvery(loginAction, loginWork);
	yield takeEvery(registerAction, registerWork);
	yield takeEvery(getMeAction, getMeWork);
	yield takeEvery(logoutAction, logoutWork);
	yield takeEvery(editProfileAction, editProfileWork);
}

export default authSaga;
