import { QueryParams } from "../utils/types";

export type CreateOrderStatusDTO = {
	name: string;
	type: string;
};

export type UpdateOrderStatusDTO = {
	name?: string;
	type?: string;
};

export type GetAllOrderStatusesDTO = QueryParams & {
	name?: string;
	type?: string;
};
