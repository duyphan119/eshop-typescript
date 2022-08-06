import { apiCaller } from "~/config/axiosCaller";
import { GetProductQueryParams } from "~/types/product";
import { AxiosResponse } from "axios";

export const getProducts = async (
	params?: GetProductQueryParams
): Promise<AxiosResponse> => {
	return apiCaller.get("product", {
		params,
	});
};
