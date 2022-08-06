import { apiCallerWithToken } from "~/config/axiosCaller";
import { AxiosResponse } from "axios";
import { GetCartItemQueryParams } from "~/types/cartItem";

export const getCartItems = async (
	token: string,
	params?: GetCartItemQueryParams
): Promise<AxiosResponse> => {
	return apiCallerWithToken(token).get(`cart-item`, {
		params,
	});
};

export const createCartItem = async (
	token: string,
	data: {
		quantity: number;
		productOptionId: number;
		cartId: number;
	}
): Promise<AxiosResponse> => {
	return apiCallerWithToken(token).post("cart-item", data);
};

export const updateCartItem = async (
	token: string,
	id: number,
	data: {
		quantity: number;
		productOptionId: number;
		cartId: number;
	}
): Promise<AxiosResponse> => {
	return apiCallerWithToken(token).patch(`cart-item/${id}`, data);
};

export const deleteCartItem = async (
	token: string,
	id: number
): Promise<AxiosResponse> => {
	return apiCallerWithToken(token).delete(`cart-item/${id}`);
};
