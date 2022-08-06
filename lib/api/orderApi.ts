import { AxiosResponse } from "axios";
import { apiCallerWithToken } from "~/config/axiosCaller";
import { CreateOrderDto, GetOrderQueryParams } from "~/types/order";

export const createOrder = (
	token: string,
	data: CreateOrderDto
): Promise<AxiosResponse> => apiCallerWithToken(token).post("order", data);

export const getUserOrders = (
	token: string,
	params?: GetOrderQueryParams
): Promise<AxiosResponse> =>
	apiCallerWithToken(token).get("order/user", { params });
