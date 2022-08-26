import { AxiosResponse } from "axios";
import { CreateOrder, GetAllOrders } from "interfaces/order";
import { AppDispatch } from "redux/store";
import { apiCallerWithToken } from "./apiCaller";

export const createOrder = (accessToken: string, dispatch: AppDispatch, data: CreateOrder): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("order", data);

export const getMyOrders = (accessToken: string, dispatch: AppDispatch, params?: GetAllOrders): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).get("order/mine", { params });

export const getOrders = (accessToken: string, dispatch: AppDispatch, params?: GetAllOrders): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).get("order", { params });
