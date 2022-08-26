import { apiCaller, apiCallerWithToken } from "api";
import { AxiosResponse } from "axios";
import { EditProfile, Login, Register } from "interfaces/auth";
import { AppDispatch } from "redux/store";

export const login = async (data: Login): Promise<AxiosResponse> => apiCaller.post(`auth/login`, data);

export const register = async (data: Register): Promise<AxiosResponse> => apiCaller.post(`auth/register`, data);

export const refreshToken = async (): Promise<AxiosResponse> => apiCaller.patch(`auth/refresh`, {});

export const logout = async (): Promise<AxiosResponse> => apiCaller.delete(`auth/logout`);

export const getMe = async (accessToken: string, dispatch: AppDispatch): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).get("auth/profile");

export const editProfile = async (accessToken: string, dispatch: AppDispatch, data: EditProfile): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).patch("auth/profile", data);
