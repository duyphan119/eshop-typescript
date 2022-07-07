import { call, put, takeEvery } from "redux-saga/effects";
import { getCategoryListSuccess } from "../slice/category";

function* workGetCategoryListFetch(): any {
  const list = yield call(() => fetch("http://localhost:3001/category"));
  const formattedList = yield list.json();
  yield put(getCategoryListSuccess(formattedList));
}

function* categorySaga() {
  yield takeEvery("category/getCategoryListFetch", workGetCategoryListFetch);
}
export default categorySaga;
