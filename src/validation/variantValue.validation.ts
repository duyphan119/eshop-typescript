import { object, optional, number, string } from "superstruct";

export const CreateVariantValueValidation = object({
	name: string(),
	variantId: number(),
});

export const UpdateVariantValueValidation = object({
	name: optional(string()),
	variantId: optional(number()),
});
