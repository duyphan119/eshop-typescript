import { AxiosResponse } from "axios";
import { CreateOrder, GetAllOrders, UpdateOrder } from "interfaces/order.interface";
import { AppDispatch } from "redux/store";
import { apiCallerWithToken } from "./apiCaller";

export const createOrder = (accessToken: string, dispatch: AppDispatch, data: CreateOrder): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).post("order", data);

export const getMyOrders = (accessToken: string, dispatch: AppDispatch, params?: GetAllOrders): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).get("order/mine", { params });

export const getOrders = (accessToken: string, dispatch: AppDispatch, params?: GetAllOrders): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).get("order", { params });

export const getOrderById = (accessToken: string, dispatch: AppDispatch, id: number): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).get(`order/${id}`);

export const updateOrder = (accessToken: string, dispatch: AppDispatch, id: number, data: UpdateOrder): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).patch(`order/${id}`, data);
