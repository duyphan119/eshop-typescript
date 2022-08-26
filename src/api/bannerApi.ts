import { apiCaller, apiCallerWithToken } from "api";
import { AxiosResponse } from "axios";
import { Banner, BannerQuery, GetBannerQueryParams } from "interfaces/banner";
import { SearchParams } from "interfaces/common";
import { AppDispatch } from "redux/store";

export const getBannerByMetaName = async (params?: BannerQuery): Promise<AxiosResponse> =>
	apiCaller.get("api/banner", {
		params,
	});

export const getBannerList = async (params?: SearchParams): Promise<AxiosResponse> =>
	apiCaller.get("api/banner", {
		params,
	});

export const addBanner = async (accessToken: string | null, dispatch: AppDispatch, data: Banner): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("api/banner", data);

export const updateBanner = async (accessToken: string | null, dispatch: AppDispatch, data: Banner): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).patch(`v1/banner/${data.id}`, data);

export const getAllBanners = async (params: GetBannerQueryParams): Promise<AxiosResponse> => apiCaller.get(`banner`, { params });
