import { AxiosResponse } from "axios";
import { apiCaller } from "~/config/axiosCaller";
import { QueryParams } from "~/types/common";

export const getAllPosts = (params?: QueryParams): Promise<AxiosResponse> => {
	return apiCaller.get("v1/api/post", { params });
};

export const getPostById = (id: number): Promise<AxiosResponse> => {
	return apiCaller.get(`v1/api/post/${id}`);
};
