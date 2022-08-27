import { AxiosResponse } from "axios";
import { GetAllOrderStatuses } from "interfaces/orderStatus.interface";
import { apiCaller } from "./apiCaller";

export const getAllOrderStatuses = (params?: GetAllOrderStatuses): Promise<AxiosResponse> => apiCaller.get("order-status", { params });
