import { QueryParams } from "../utils/types";
export type CreateProductUserDTO = {
	productId: number;
};

export type GetAllProductUsersDTO = QueryParams & {
	productId?: string;
	userId?: string;
};
