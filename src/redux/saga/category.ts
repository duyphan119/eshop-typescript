import { message } from "antd";
import { call, put, takeEvery } from "redux-saga/effects";
import apiCaller, { apiCallerWithToken } from "../../api/apiCaller";
import { STATUS_CODE } from "../../constants";
import {
  addCategoryFailure,
  addCategorySuccess,
  deleteCategoryFailure,
  deleteCategorySuccess,
  getCategoryListFailure,
  getCategoryListSuccess,
  updateCategoryFailure,
  updateCategorySuccess,
  deleteManyCategorySuccess,
  deleteManyCategoryFailure,
  searchCategorySuccess,
  searchCategoryFailure,
} from "../slice/category";

function* workGetCategoryListFetch(): any {
  try {
    const res = yield call(() =>
      apiCaller("category", {
        params: {
          depth: 1,
          all: true,
        },
      })
    );
    const { data, status } = res;
    if (status === STATUS_CODE.OK) {
      yield put(getCategoryListSuccess(data.items));
    } else {
      yield put(getCategoryListFailure());
    }
  } catch (error) {
    yield put(getCategoryListFailure());
  }
}
function* workAddCategoryFetch({ payload }: any): any {
  try {
    const { accessToken, dispatch, afterSuccess, ...others } = payload;
    const res = yield call(() =>
      apiCallerWithToken(accessToken, dispatch).post("category", others)
    );
    const { data, status } = res;
    if (status === STATUS_CODE.CREATED) {
      yield put(addCategorySuccess(data.item));
      message.success("Thêm thành công");
      afterSuccess();
    } else {
      yield put(addCategoryFailure());
      message.error("Thêm thất bại");
    }
  } catch (error) {
    yield put(addCategoryFailure());
    message.error("Thêm thất bại");
  }
}
function* workUpdateCategoryFetch({ payload }: any): any {
  try {
    const { accessToken, dispatch, afterSuccess, id, ...others } = payload;
    const res = yield call(() =>
      apiCallerWithToken(accessToken, dispatch).patch(`category/${id}`, others)
    );
    const { data, status } = res;
    if (status === STATUS_CODE.OK) {
      yield put(updateCategorySuccess({ ...others, ...data.item }));
      message.success("Sửa thành công");
      afterSuccess();
    } else {
      yield put(updateCategoryFailure());
      message.error("Sửa thất bại");
    }
  } catch (error) {
    yield put(updateCategoryFailure());
    message.error("Sửa thất bại");
  }
}
function* workDeleteCategoryFetch({ payload }: any): any {
  try {
    const { accessToken, dispatch, id } = payload;
    const res = yield call(() =>
      apiCallerWithToken(accessToken, dispatch).delete(`category/${id}`)
    );
    const { status } = res;
    if (status === STATUS_CODE.OK) {
      yield put(deleteCategorySuccess(id));
      message.success("Xoá thành công");
    } else {
      yield put(deleteCategoryFailure());
      message.error("Xoá thất bại");
    }
  } catch (error) {
    yield put(deleteCategoryFailure());
    message.error("Xoá thất bại");
  }
}
function* workSearchCategoryFetch({ payload }: any): any {
  try {
    const { q } = payload;
    const res = yield call(() =>
      apiCaller("category/search", {
        params: {
          q,
          depth: 1,
          all: true,
        },
      })
    );
    const { data, status } = res;
    if (status === STATUS_CODE.OK) {
      yield put(searchCategorySuccess(data.items));
    } else {
      yield put(searchCategoryFailure());
    }
  } catch (error) {
    yield put(searchCategoryFailure());
  }
}

function* workDeleteManyCategoryFetch({ payload }: any): any {
  try {
    const { accessToken, dispatch, listId } = payload;
    const res = yield call(() =>
      apiCallerWithToken(accessToken, dispatch).delete("category", {
        data: listId,
      })
    );
    const { status } = res;
    console.log(res);
    if (status === STATUS_CODE.OK) {
      yield put(deleteManyCategorySuccess(listId));
      message.success("Xoá thành công");
    } else {
      yield put(deleteManyCategoryFailure());
      message.error("Xoá thất bại");
    }
  } catch (error) {
    yield put(deleteManyCategoryFailure());
    message.error("Xoá thất bại");
  }
}

function* categorySaga() {
  yield takeEvery("category/getCategoryListFetch", workGetCategoryListFetch);
  yield takeEvery("category/addCategoryFetch", workAddCategoryFetch);
  yield takeEvery("category/updateCategoryFetch", workUpdateCategoryFetch);
  yield takeEvery("category/deleteCategoryFetch", workDeleteCategoryFetch);
  yield takeEvery(
    "category/deleteManyCategoryFetch",
    workDeleteManyCategoryFetch
  );
  yield takeEvery("category/searchCategoryFetch", workSearchCategoryFetch);
}
export default categorySaga;
