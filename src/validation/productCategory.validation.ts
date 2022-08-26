import { number, object } from "superstruct";

export const CreateProductCategoryValidation = object({
	categoryId: number(),
	productId: number(),
});
