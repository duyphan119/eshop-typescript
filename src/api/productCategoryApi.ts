import { AppDispatch } from "./../redux/store";
import { AxiosResponse } from "axios";
import { CreateProductCategory, GetProducts, ProductCategory } from "interfaces/productCategory";
import { apiCaller, apiCallerWithToken } from "./apiCaller";

export const addManyProductCategory = async (accessToken: string | null, dispatch: AppDispatch, data: ProductCategory[]): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("api/product-category/many", data);

export const getProducts = async (categoryId: number, params?: GetProducts): Promise<AxiosResponse> => {
	return apiCaller.get(`v1/product-category/product/${categoryId}`, {
		params,
	});
};

export const createManyProductCategories = async (accessToken: string, dispatch: AppDispatch, data: Array<CreateProductCategory>) =>
	apiCallerWithToken(accessToken, dispatch).post("product-category/many", data);
