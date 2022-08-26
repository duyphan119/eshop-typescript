import { number, object } from "superstruct";

export const CreateProductUserValidation = object({
	productId: number(),
});
