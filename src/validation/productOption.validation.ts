import { array, number, object, optional, string } from "superstruct";

export const CreateProductOptionValidation = object({
	title: string(),
	sku: string(),
	productId: number(),
	thumbnail: optional(string()),
	amount: number(),
	weight: number(),
});

export const UpdateProductOptionValidation = object({
	price: optional(number()),
	weight: optional(number()),
	productId: optional(number()),
	title: optional(string()),
	sku: optional(string()),
	thumbnail: optional(string()),
});
