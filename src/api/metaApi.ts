import { AppDispatch } from "redux/store";
import { apiCaller, apiCallerWithToken } from "api";
import { SearchParams } from "interfaces/common";
import { AxiosResponse } from "axios";
import { Meta } from "interfaces/meta";

export const getMetaList = async (params?: SearchParams): Promise<AxiosResponse> =>
	apiCaller.get("api/meta", {
		params,
	});

export const addMeta = async (accessToken: string | null, dispatch: AppDispatch, data: Meta): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("api/meta", data);

export const updateMeta = async (accessToken: string | null, dispatch: AppDispatch, data: Meta): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).patch(`v1/meta/${data.id}`, data);
