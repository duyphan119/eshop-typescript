import { apiCaller, apiCallerWithToken } from "api";
import { AxiosResponse } from "axios";
import { CreateVariantValue, GetVariantValueQueryParams, UpdateVariantValue, VariantValue } from "interfaces/variantValue";
import { AppDispatch } from "redux/store";

export const addVariantValue = async (accessToken: string | null, dispatch: AppDispatch, data: VariantValue): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("variant-value", data);

export const getAllVariantValues = async (params?: GetVariantValueQueryParams): Promise<AxiosResponse> => apiCaller.get("variant-value", { params });
export const createVariantValue = async (accessToken: string, dispatch: AppDispatch, data: CreateVariantValue): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("variant-value", data);

export const updateVariantValue = async (accessToken: string, dispatch: AppDispatch, id: number, data: UpdateVariantValue): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).patch(`variant-value/${id}`, data);

export const deleteVariantValue = async (accessToken: string, dispatch: AppDispatch, id: number): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).delete(`variant-value/${id}`);

export const deleteManyVariantValues = async (accessToken: string, dispatch: AppDispatch, data: { ids: React.Key[] }): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).delete(`variant-value/many`, { data });
