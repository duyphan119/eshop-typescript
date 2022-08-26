import isEmail from "isemail";
import { object, optional, refine, size, string } from "superstruct";

export const CreateOrderStatusValidation = object({
	name: string(),
	type: string(),
});

export const UpdateOrderStatusValidation = object({
	name: optional(string()),
	type: optional(string()),
});
