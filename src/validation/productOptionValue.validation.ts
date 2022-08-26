import { number, object, optional } from "superstruct";

export const CreateProductOptionValueValidation = object({
	productOptionId: number(),
	variantValueId: number(),
});
