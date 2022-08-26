import { apiCaller } from "api";
import { AxiosResponse } from "axios";
import { CreateProduct, GetProductQueryParams, UpdateProduct } from "interfaces/product";
import { AppDispatch } from "redux/store";
import { apiCallerWithToken } from "./apiCaller";

export const getAllProducts = async (params?: GetProductQueryParams): Promise<AxiosResponse> => apiCaller.get("product", { params });

export const createProduct = async (accessToken: string, dispatch: AppDispatch, data: CreateProduct): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("product", data);

export const updateProduct = async (accessToken: string, dispatch: AppDispatch, id: number, data: UpdateProduct): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).patch(`product/${id}`, data);

export const deleteProduct = async (accessToken: string, dispatch: AppDispatch, id: number): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).delete(`product/${id}`);

export const deleteManyProducts = async (accessToken: string, dispatch: AppDispatch, data: { ids: React.Key[] }): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).delete(`product/many`, { data });
