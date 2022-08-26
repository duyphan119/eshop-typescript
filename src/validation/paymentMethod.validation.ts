import { object, optional, size, string } from "superstruct";

export const CreatePaymentMethodValidation = object({
	name: string(),
});

export const UpdatePaymentMethodValidation = object({
	name: optional(string()),
});
