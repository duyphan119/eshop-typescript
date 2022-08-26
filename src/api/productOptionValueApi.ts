import { AxiosResponse } from "axios";
import { AppDispatch } from "../redux/store";
// import { ProductPayload } from "interfaces/product";
import { CreateProductOptionValue } from "interfaces/productOptionValue";
import { apiCallerWithToken } from "./apiCaller";

export const createManyProductOptionValues = async (
	accessToken: string,
	dispatch: AppDispatch,
	data: Array<CreateProductOptionValue>
): Promise<AxiosResponse> => apiCallerWithToken(accessToken, dispatch).post("product-option-value/many", data);
