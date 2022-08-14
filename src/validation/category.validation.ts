import { nullable, number, object, optional, size, string } from "superstruct";

export const CreateCategoryValidation = object({
	title: string(),
	name: string(),
	slug: string(),
	description: optional(string()),
	categoryTypeId: number(),

	thumbnail: optional(string()),
	parentId: nullable(number()),
});

export const UpdateCategoryValidation = object({
	title: optional(string()),
	name: optional(string()),
	slug: optional(string()),
	description: optional(string()),
	categoryTypeId: optional(number()),

	thumbnail: optional(string()),
	parentId: optional(nullable(number())),
});
