import { apiCaller, apiCallerWithToken } from "~/config/axiosCaller";
import { AxiosResponse } from "axios";

export const refreshToken = async (): Promise<AxiosResponse> => {
	return apiCaller.patch("auth/refresh", {});
};

export const getProfile = async (token: string): Promise<AxiosResponse> => {
	return apiCallerWithToken(token).get("auth/profile");
};

export const login = async (data: {
	email: string;
	password: string;
}): Promise<AxiosResponse> => {
	return apiCaller.post("auth/login", data);
};
export const register = async (data: {
	email: string;
	password: string;
	fullName: string;
}): Promise<AxiosResponse> => {
	return apiCaller.post("auth/register", data);
};
