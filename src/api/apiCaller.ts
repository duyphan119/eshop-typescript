import { decodeToken } from "./../utils/index";
import axios, { AxiosRequestConfig } from "axios";
import { API } from "../constants";
import { getNewAccessToken } from "../redux/slice/auth";
import { Dispatch } from "@reduxjs/toolkit";

const apiCaller = axios.create({
  baseURL: API.BASE_URL,
  withCredentials: true,
});

export const apiCallerWithToken = (
  token: string,
  dispatch: Dispatch | null
) => {
  const instance = axios.create({
    baseURL: API.BASE_URL,
    withCredentials: true,
  });
  instance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
      if (config.headers) {
        const decoded = decodeToken(token);

        if (decoded && decoded.exp * 1000 < new Date().getTime()) {
          const res = await apiCaller.post("auth/refresh", {});
          if (res && res.data) {
            const { accessToken } = res.data;
            if (accessToken) {
              if (dispatch) {
                dispatch(getNewAccessToken(accessToken));
              }
              config.headers["Authorization"] = `Bearer ${accessToken}`;
              return config;
            }
          }
        }
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      console.log("ko co headers");
      return config;
    },
    (err) => {
      console.log(err);
    }
  );

  return instance;
};

export default apiCaller;
