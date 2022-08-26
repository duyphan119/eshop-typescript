import { apiCallerWithToken } from "api";
import { AxiosResponse } from "axios";
import { QueryParams } from "interfaces/common";
import { AppDispatch } from "redux/store";

export const getMine = async (
	accessToken: string | null,
	dispatch: AppDispatch,
	params?: QueryParams
): Promise<AxiosResponse> =>
	apiCallerWithToken(accessToken, dispatch).get("api/cart/mine", {
		params,
	});
