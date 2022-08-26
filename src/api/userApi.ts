import { apiCallerWithToken } from "./apiCaller";
import { AppDispatch } from "redux/store";
import { AxiosResponse } from "axios";
import { CreateUser, GetUserQueryParams, UpdateUser } from "interfaces/user";

export const getMe = async (accessToken: string, dispatch: AppDispatch): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).get("auth/profile");

export const getAllUsers = async (accessToken: string, dispatch: AppDispatch, params?: GetUserQueryParams): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).get("user", {
		params,
	});

export const createUser = async (accessToken: string, dispatch: AppDispatch, data: CreateUser): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("user", data);

export const updateUser = async (accessToken: string, dispatch: AppDispatch, id: number, data: UpdateUser): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).patch(`user/${id}`, data);

export const deleteUser = async (accessToken: string, dispatch: AppDispatch, id: number): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).delete(`user/${id}`);
export const deleteManyUser = async (accessToken: string, dispatch: AppDispatch, data: { ids: React.Key[] }): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).delete(`user/many`, { data });
