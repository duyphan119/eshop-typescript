import { apiCaller, apiCallerWithToken } from "api";
import { AxiosResponse } from "axios";
import { CreateCategory, GetCategoryQueryParams, UpdateCategory } from "interfaces/category";
import { QueryParams } from "interfaces/common";
import { AppDispatch } from "./../redux/store";

export const getCategoryList = async (params?: QueryParams): Promise<AxiosResponse> =>
	apiCaller.get("category", {
		params,
	});
export const createCategory = async (accessToken: string, dispatch: AppDispatch, data: CreateCategory): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("category", data);

export const getAllCategories = async (params?: GetCategoryQueryParams): Promise<AxiosResponse> => apiCaller.get("category", { params });

export const updateCategory = async (accessToken: string, dispatch: AppDispatch, id: number, data: UpdateCategory): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).patch(`category/${id}`, data);

export const deleteCategory = async (accessToken: string, dispatch: AppDispatch, id: number): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).delete(`category/${id}`);

export const deleteManyCategories = async (accessToken: string, dispatch: AppDispatch, data: { ids: React.Key[] }): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).delete(`category/many`, { data });
