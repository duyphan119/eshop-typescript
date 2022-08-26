import { number, object, optional } from "superstruct";

export const CreateCartItemValidation = object({
	productOptionId: number(),
	quantity: number(),
});

export const UpdateCartItemValidation = object({
	newQuantity: optional(number()),
});
