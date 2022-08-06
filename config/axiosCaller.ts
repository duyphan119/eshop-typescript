import axios, { AxiosRequestConfig } from "axios";
import * as authApi from "~/lib/api/authApi";
import { decodeToken, setToken } from "~/utils";

export const apiCaller = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	withCredentials: true,
});

export const apiCallerFormData = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "multipart/form-data",
	},
});

export const apiCallerGHN = axios.create({
	baseURL: "https://online-gateway.ghn.vn/shiip/public-api",
	headers: {
		token: process.env.TOKEN_GHN || "",
	},
});

export const apiCallerWithToken = (token: string | null) => {
	const instance = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
		withCredentials: true,
	});
	instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
		try {
			if (config.headers) {
				const decoded = decodeToken(token);

				if (decoded && decoded.exp * 1000 < new Date().getTime()) {
					const res = await authApi.refreshToken();
					if (res && res.data) {
						const { accessToken } = res.data;
						if (accessToken) {
							setToken(accessToken);
							config.headers[
								"Authorization"
							] = `Bearer ${accessToken}`;

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
			if (status === 401 && data.message === "Login now") {
				localStorage.removeItem("AT");
			}
		}

		return config;
	});

	return instance;
};
