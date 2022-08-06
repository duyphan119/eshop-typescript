import { apiCaller } from "~/config/axiosCaller";
import { GetCategoryQueryParams } from "~/types/category";
import { AxiosResponse } from "axios";

export const getCategories = async (
	params?: GetCategoryQueryParams
): Promise<AxiosResponse> => {
	return apiCaller.get("category", {
		params,
	});
};
