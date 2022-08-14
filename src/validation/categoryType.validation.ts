import { object, optional, size, string } from "superstruct";

export const CreateCategoryTypeValidation = object({
	name: string(),
});

export const UpdateCategoryTypeValidation = object({
	name: optional(string()),
});
