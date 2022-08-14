import { nullable, number, object, optional, size, string } from "superstruct";

export const CreateProductValidation = object({
	name: string(),
	slug: string(),
	description: optional(string()),
	thumbnail: optional(string()),
	price: number(),
	newPrice: nullable(number()),
});

export const UpdateProductValidation = object({
	price: optional(number()),
	name: optional(string()),
	slug: optional(string()),
	description: optional(string()),
	newPrice: optional(nullable(number())),
	thumbnail: optional(string()),
});
