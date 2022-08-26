import { QueryParams } from "../utils/types";

export type CreateCartItemDTO = {
	productOptionId: number;
	quantity: number;
};

export type UpdateCartItemDTO = {
	productOptionId: number;
	newQuantity: number;
};
