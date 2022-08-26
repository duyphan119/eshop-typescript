import { decodeToken } from "utils";
import axios, { AxiosRequestConfig } from "axios";
import { API, STATUS_CODE } from "constant";
import { authActions } from "redux/slice/auth.slice";
import { Dispatch } from "@reduxjs/toolkit";
import * as authApi from "api/authApi";

export const apiCaller = axios.create({
	baseURL: API.BASE_URL,
	withCredentials: true,
});

export const apiCallerFormData = axios.create({
	baseURL: API.BASE_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "multipart/form-data",
	},
});
export const apiCallerWithToken = (token: string | null, dispatch: Dispatch | null) => {
	const instance = axios.create({
		baseURL: API.BASE_URL,
		withCredentials: true,
	});
	instance.interceptors.request.use(
		async (config: AxiosRequestConfig) => {
			try {
				if (config.headers) {
					const decoded = decodeToken(token);

					if (decoded && decoded.exp * 1000 < new Date().getTime()) {
						const res = await authApi.refreshToken();
						if (res && res.data) {
							const { accessToken } = res.data;
							if (accessToken) {
								if (dispatch) {
									dispatch(authActions.getNewAccessToken(accessToken));
								}
								config.headers["Authorization"] = `Bearer ${accessToken}`;
								console.log("refresh token");
								return config;
							}
						} else {
							console.log({ res });
						}
					}
					console.log("access token");
					config.headers["Authorization"] = `Bearer ${token}`;
				}
			} catch (error: any) {
				const { data, status } = error.response;
				if (status === STATUS_CODE.UNAUTHORIZED || data.message === "Login now") {
					if (dispatch) {
						dispatch(authActions.logoutFetch({}));
					}
				}
			}

			return config;
		},
		(err) => {}
	);

	return instance;
};
