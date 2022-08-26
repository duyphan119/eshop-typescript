import { apiCallerWithToken } from "api";
import { AxiosResponse } from "axios";
import { QueryParams } from "interfaces/common";
import { CreateProductUser } from "interfaces/productUser";
import { AppDispatch } from "redux/store";

export const createProductUser = async (accessToken: string, dispatch: AppDispatch, data: CreateProductUser): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("wishlist", data);

export const deleteProductUser = async (accessToken: string, dispatch: AppDispatch, productId: number): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).delete(`wishlist/${productId}`);

export const getAllProductUsers = async (accessToken: string, dispatch: AppDispatch, params?: QueryParams): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).get("wishlist", {
		params,
	});
