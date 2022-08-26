import { AppDispatch } from "redux/store";
import { apiCallerWithToken } from "api";
import { QueryParams } from "interfaces/common";
import { AxiosResponse } from "axios";
import { Vote } from "interfaces/vote";

export const getVoteList = async (accessToken: string | null, dispatch: AppDispatch, params?: QueryParams): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).get("api/vote", {
		params,
	});
export const addVote = async (accessToken: string | null, dispatch: AppDispatch, data: Vote): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("api/vote", data);
export const updateVote = async (accessToken: string | null, dispatch: AppDispatch, data: Vote): Promise<AxiosResponse> => {
	const { id, ...others } = data;
	return apiCallerWithToken(accessToken, dispatch).patch(`v1/vote/${id}`, others);
};
