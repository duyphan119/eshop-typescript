import axios, { AxiosResponse } from "axios";

export const getProvincesVN = async (): Promise<AxiosResponse> => {
	return axios.get(`https://provinces.open-api.vn/api/?depth=3`);
};
