import { AxiosResponse } from "axios";
import { GetAllPaymentMethod } from "interfaces/paymentMethod";
import { apiCaller } from "./apiCaller";

export const getAllPaymentMethod = (params?: GetAllPaymentMethod): Promise<AxiosResponse> => apiCaller.get("payment-method", { params });
