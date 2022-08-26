import { PayloadAction } from "@reduxjs/toolkit";
import { createUser, deleteManyUser, deleteUser, getAllUsers, updateUser } from "api/userApi";
import { CODE } from "constant";
import { CreateUserPayload, DeleteManyUserPayload, DeleteUserPayload, GetUserPayload, UpdateUserPayload } from "interfaces/user";
import { call, put, takeEvery } from "redux-saga/effects";
import { createUserAction, deleteManyUserAction, deleteUserAction, getAllUsersAction, updateUserAction, userActions } from "redux/slice/user";

function* getAllUsersSaga({ payload }: PayloadAction<GetUserPayload>): any {
	try {
		const { accessToken, dispatch, params } = payload;
		const res = yield call(() => getAllUsers(accessToken, dispatch, params));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(userActions.getAllUsersSuccess(data));
		} else {
			yield put(userActions.getAllUsersFailure());
		}
	} catch (error) {
		yield put(userActions.getAllUsersFailure());
	}
}
function* createUserSaga({ payload }: PayloadAction<CreateUserPayload>): any {
	try {
		const { accessToken, dispatch, data: reqData, onDone } = payload;
		const res = yield call(() => createUser(accessToken, dispatch, reqData));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(userActions.createUserSuccess(data));
			onDone && onDone();
		} else {
			yield put(userActions.createUserFailure());
		}
	} catch (error) {
		yield put(userActions.createUserFailure());
	}
}
function* updateUserSaga({ payload }: PayloadAction<UpdateUserPayload>): any {
	try {
		const { accessToken, dispatch, data: reqData, id, onDone } = payload;
		const res = yield call(() => updateUser(accessToken, dispatch, id, reqData));
		const { data, code } = res.data;
		if (code === CODE.OK) {
			yield put(userActions.updateUserSuccess(data));
			onDone && onDone();
		} else {
			yield put(userActions.updateUserFailure());
		}
	} catch (error) {
		yield put(userActions.updateUserFailure());
	}
}
function* deleteUserSaga({ payload }: PayloadAction<DeleteUserPayload>): any {
	try {
		const { accessToken, dispatch, id, onDone } = payload;
		const res = yield call(() => deleteUser(accessToken, dispatch, id));
		const { code } = res.data;
		if (code === CODE.OK) {
			yield put(userActions.deleteUserSuccess(id));
			onDone && onDone();
		} else {
			yield put(userActions.deleteUserFailure());
		}
	} catch (error) {
		yield put(userActions.deleteUserFailure());
	}
}
function* deleteManyUserSaga({ payload }: PayloadAction<DeleteManyUserPayload>): any {
	try {
		const { accessToken, dispatch, onDone, ids } = payload;
		const res = yield call(() => deleteManyUser(accessToken, dispatch, { ids }));
		const { code } = res.data;
		if (code === CODE.OK) {
			yield put(userActions.deleteManyUserSuccess(ids));
			onDone && onDone();
		} else {
			yield put(userActions.deleteManyUserFailure());
		}
	} catch (error) {
		yield put(userActions.deleteManyUserFailure());
	}
}

function* userSaga() {
	yield takeEvery(getAllUsersAction, getAllUsersSaga);
	yield takeEvery(createUserAction, createUserSaga);
	yield takeEvery(updateUserAction, updateUserSaga);
	yield takeEvery(deleteUserAction, deleteUserSaga);
	yield takeEvery(deleteManyUserAction, deleteManyUserSaga);
}

export default userSaga;
