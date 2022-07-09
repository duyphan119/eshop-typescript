import { takeEvery, call, put } from "redux-saga/effects";
import apiCaller, { apiCallerWithToken } from "../../api/apiCaller";
import config from "../../config";
import { STATUS_CODE } from "../../constants";
import {
  getMeFailure,
  getMeSuccess,
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
} from "../slice/auth";

function* workLoginFetch({ payload }: any): any {
  try {
    const { dispatch, navigate } = payload;
    const res = yield call(() => apiCaller.post("auth/signin", payload));
    const { data, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(loginSuccess(data));
      const res1 = yield call(() =>
        apiCallerWithToken(data.accessToken, dispatch).get("user/me")
      );
      if (res1 && res1.status === STATUS_CODE.OK) {
        yield put(getMeSuccess(res1.data));
        navigate(
          res1.data.isAdmin ? config.routes.dashboard : config.routes.home
        );
      } else {
        yield put(getMeFailure());
      }
    } else {
      yield put(loginFailure());
    }
  } catch (error) {
    yield put(loginFailure());
  }
}

function* workRegisterFetch({ payload }: any): any {
  try {
    const { dispatch, navigate } = payload;
    const res = yield call(() => apiCaller.post("auth/signup", payload));
    const { data, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(registerSuccess(data));
      const res1 = yield call(() =>
        apiCallerWithToken(data.accessToken, dispatch).get("user/me")
      );
      if (res1 && res1.status === STATUS_CODE.OK) {
        yield put(getMeSuccess(res1.data));
        navigate(
          res1.data.isAdmin ? config.routes.dashboard : config.routes.home
        );
      } else {
        yield put(getMeFailure());
      }
    } else {
      yield put(registerFailure());
    }
  } catch (error) {
    yield put(registerFailure());
  }
}

function* workGetMeFetch({ payload }: any): any {
  try {
    const { accessToken, dispatch } = payload;
    const res = yield call(() =>
      apiCallerWithToken(accessToken, dispatch).get("user/me")
    );
    const { data, status } = res;
    if (status === STATUS_CODE.OK) {
      yield put(getMeSuccess(data));
    } else {
      yield put(getMeFailure());
    }
  } catch (error) {
    yield put(getMeFailure());
  }
}

function* authSaga() {
  yield takeEvery("auth/loginFetch", workLoginFetch);
  yield takeEvery("auth/registerFetch", workRegisterFetch);
  yield takeEvery("auth/getMeFetch", workGetMeFetch);
}

export default authSaga;
