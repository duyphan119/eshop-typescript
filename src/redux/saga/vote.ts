import { PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import * as voteApi from "api/voteApi";
import { STATUS_CODE } from "constant";
import { GetVotePayload, VotePayload } from "interfaces/vote";
import { call, put, takeEvery } from "redux-saga/effects";
import { voteActions } from "redux/slice/vote";

function* workGetVoteListFetch({
	payload,
}: PayloadAction<GetVotePayload>): any {
	try {
		const { accessToken, dispatch, params } = payload;
		const res = yield call(() =>
			voteApi.getVoteList(accessToken, dispatch, params)
		);
		const { data, status } = res;

		if (status === STATUS_CODE.OK) {
			yield put(voteActions.getVoteListSuccess(data.items));
		} else {
			yield put(voteActions.getVoteListFailure());
		}
	} catch (error) {
		yield put(voteActions.getVoteListFailure());
	}
}

function* workAddVoteProductDetailPageFetch({
	payload,
}: PayloadAction<VotePayload>): any {
	const { accessToken, dispatch, body } = payload;
	try {
		const res = yield call(() =>
			voteApi.addVote(accessToken, dispatch, body)
		);
		const { data, status } = res;

		if (status === STATUS_CODE.CREATED) {
			yield put(voteActions.addVoteProductDetailPageSuccess(data));
		} else {
			yield put(voteActions.addVoteProductDetailPageFailure());
		}
	} catch (error) {
		yield put(voteActions.addVoteProductDetailPageFailure());
	}
}

function* workUpdateVoteFetch({ payload }: PayloadAction<VotePayload>): any {
	const { accessToken, dispatch, afterSuccess, body } = payload;
	try {
		const res = yield call(() =>
			voteApi.updateVote(accessToken, dispatch, body)
		);
		const { data, status } = res;

		if (status === STATUS_CODE.OK) {
			yield put(voteActions.updateVoteSuccess(data));
			message.success("Update new variant value success");
			afterSuccess && afterSuccess();
		} else {
			yield put(voteActions.updateVoteFailure());
			message.error("Update new variant value failure");
		}
	} catch (error) {
		yield put(voteActions.updateVoteFailure());
		message.error("Update new variant value failure");
	}
}

function* workGetVoteListProductDetailPageFetch({
	payload,
}: PayloadAction<GetVotePayload>): any {
	try {
		const { accessToken, dispatch, params } = payload;
		const res = yield call(() =>
			voteApi.getVoteList(accessToken, dispatch, params)
		);
		const { data, status } = res;

		if (status === STATUS_CODE.OK) {
			yield put(
				voteActions.getVoteListProductDetailPageSuccess(data.items)
			);
		} else {
			yield put(voteActions.getVoteListProductDetailPageFailure());
		}
	} catch (error) {
		yield put(voteActions.getVoteListProductDetailPageFailure());
	}
}
function* voteSaga() {
	yield takeEvery("vote/getVoteListFetch", workGetVoteListFetch);
	yield takeEvery(
		"vote/getVoteListProductDetailPageFetch",
		workGetVoteListProductDetailPageFetch
	);
	yield takeEvery(
		"vote/addVoteProductDetailPageFetch",
		workAddVoteProductDetailPageFetch
	);
	yield takeEvery("vote/updateVoteFetch", workUpdateVoteFetch);
}
export default voteSaga;
