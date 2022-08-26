import { QueryParams } from "./../interfaces/common";
import { AxiosResponse } from "axios";
import { AppDispatch } from "../redux/store";
// import { ProductPayload } from "interfaces/product";
import { CreateProductOption, ProductOptionHasValue } from "interfaces/productOption";
import { apiCallerWithToken } from "./apiCaller";

export const createMany = async (accessToken: string | null, dispatch: AppDispatch, data: ProductOptionHasValue[]): Promise<AxiosResponse> => {
	return apiCallerWithToken(accessToken, dispatch).post("api/product-option/many", data);
};

export const getAll = async (accessToken: string | null, dispatch: AppDispatch, params?: QueryParams): Promise<AxiosResponse> => {
	return apiCallerWithToken(accessToken, dispatch).get("api/product-option", {
		params,
	});
};

export const createProductOption = async (accessToken: string, dispatch: AppDispatch, data: CreateProductOption): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("product-option", data);
