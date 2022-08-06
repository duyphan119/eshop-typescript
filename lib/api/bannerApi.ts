import { AxiosResponse } from "axios";
import { apiCaller } from "~/config/axiosCaller";
import { GetBannerQueryParams } from "~/types/banner";

export const getBanners = (
	params?: GetBannerQueryParams
): Promise<AxiosResponse> => apiCaller.get("banner", { params });
