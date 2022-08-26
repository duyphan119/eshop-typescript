import { object, optional, string } from "superstruct";

export const CreateMetaValidation = object({
	name: string(),
	description: optional(string()),
});

export const UpdateMetaValidation = object({
	name: optional(string()),
	description: optional(string()),
});
