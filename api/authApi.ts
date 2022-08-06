import { AxiosResponse } from "axios";
import { apiCaller } from "~/config/axiosCaller";

export const register = (body: {
	email: string;
	password: string;
	fullName: string;
}): Promise<AxiosResponse> => {
	return apiCaller.post("auth/register", body);
};

export const login = (body: {
	email: string;
	password: string;
}): Promise<AxiosResponse> => {
	return apiCaller.post("auth/login", body);
};

export const logout = (): Promise<AxiosResponse> => {
	return apiCaller.delete("auth/logout", {});
};
