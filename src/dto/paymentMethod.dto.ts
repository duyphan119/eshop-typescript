import { QueryParams } from "../utils/types";

export type CreatePaymentMethodDTO = {
	name: string;
};

export type UpdatePaymentMethodDTO = {
	name?: string;
};

export type GetAllPaymentMethodsDTO = QueryParams & {
	name?: string;
};
