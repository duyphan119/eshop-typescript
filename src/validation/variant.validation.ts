import { object, optional, size, string } from "superstruct";

export const CreateVariantValidation = object({
	name: string(),
});

export const UpdateVariantValidation = object({
	name: optional(string()),
});
