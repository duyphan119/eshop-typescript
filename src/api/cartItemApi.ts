import { apiCallerWithToken } from "api";
import { AxiosResponse } from "axios";
import { CreateCartItem, DeleteManyCartItems, UpdateCartItem } from "interfaces/cartItem";
import { QueryParams } from "interfaces/common";
import { AppDispatch } from "redux/store";

export const deleteManyCartItems = async (accessToken: string, dispatch: AppDispatch, data: DeleteManyCartItems): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).delete(`cart-item/many`, { data });

export const updateCartItem = async (accessToken: string, dispatch: AppDispatch, data: UpdateCartItem): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).patch(`cart-item/${data.productOptionId}`, { newQuantity: data.quantity });

export const createCartItem = async (accessToken: string, dispatch: AppDispatch, data: CreateCartItem): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("cart-item", data);

export const getAllCartItems = async (accessToken: string, dispatch: AppDispatch, params?: QueryParams) =>
	apiCallerWithToken(accessToken, dispatch).get("cart-item", { params });
