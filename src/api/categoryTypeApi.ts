import { apiCaller, apiCallerWithToken } from "api";
import { AxiosResponse } from "axios";
import { CreateCategoryType, GetCategoryTypeQueryParams, UpdateCategoryType } from "interfaces/categoryType";
import { AppDispatch } from "./../redux/store";

export const createCategoryType = async (accessToken: string, dispatch: AppDispatch, data: CreateCategoryType): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("category-type", data);

export const getAllCategoryTypes = async (params?: GetCategoryTypeQueryParams): Promise<AxiosResponse> => apiCaller.get("category-type", { params });

export const updateCategoryType = async (accessToken: string, dispatch: AppDispatch, id: number, data: UpdateCategoryType): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).patch(`category-type/${id}`, data);

export const deleteCategoryType = async (accessToken: string, dispatch: AppDispatch, id: number): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).delete(`category-type/${id}`);

export const deleteManyCategoryTypes = async (accessToken: string, dispatch: AppDispatch, data: { ids: React.Key[] }): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).delete(`category-type/many`, { data });
