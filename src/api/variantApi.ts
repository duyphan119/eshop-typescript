import { apiCaller, apiCallerWithToken } from "api";
import { AxiosResponse } from "axios";
import { CreateVariant, GetVariantQueryParams, UpdateVariant, Variant } from "interfaces/variant";
import { AppDispatch } from "redux/store";

export const addVariant = async (accessToken: string | null, dispatch: AppDispatch, data: Variant): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("variant", data);

export const getAllVariants = async (params?: GetVariantQueryParams): Promise<AxiosResponse> => apiCaller.get("variant", { params });
export const createVariant = async (accessToken: string, dispatch: AppDispatch, data: CreateVariant): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("variant", data);

export const updateVariant = async (accessToken: string, dispatch: AppDispatch, id: number, data: UpdateVariant): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).patch(`variant/${id}`, data);

export const deleteVariant = async (accessToken: string, dispatch: AppDispatch, id: number): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).delete(`variant/${id}`);

export const deleteManyVariants = async (accessToken: string, dispatch: AppDispatch, data: { ids: React.Key[] }): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).delete(`variant/many`, { data });
