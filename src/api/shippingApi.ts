import { AxiosResponse } from "axios";
import { CalculateFee, GetDistricts, GetWards } from "interfaces/shipping";
import { apiCaller } from "./apiCaller";
export const getCities = (): Promise<AxiosResponse> => apiCaller.get(`shipping/province`);
export const getDistricts = (params?: GetDistricts): Promise<AxiosResponse> => apiCaller.get(`shipping/district`, { params });
export const getWards = (params?: GetWards): Promise<AxiosResponse> => apiCaller.get(`shipping/ward`, { params });
export const getFee = (params?: CalculateFee): Promise<AxiosResponse> => apiCaller.get(`shipping/fee`, { params });
