import { CreateVoteDto } from "~/types/vote";
import { apiCallerWithToken } from "~/config/axiosCaller";
import { AxiosResponse } from "axios";
import { GetVoteQueryParams } from "~/types/vote";

export const getVotes = async (
	token: string,
	params?: GetVoteQueryParams
): Promise<AxiosResponse> => {
	return apiCallerWithToken(token).get(`vote`, {
		params,
	});
};

export const createVote = async (
	token: string,
	data: CreateVoteDto
): Promise<AxiosResponse> => {
	return apiCallerWithToken(token).post("vote", data);
};

export const updateVote = async (
	token: string,
	id: number,
	data: CreateVoteDto
): Promise<AxiosResponse> => {
	return apiCallerWithToken(token).patch(`vote/${id}`, data);
};

export const deleteVote = async (
	token: string,
	id: number
): Promise<AxiosResponse> => {
	return apiCallerWithToken(token).delete(`vote/${id}`);
};
