import { date, number, object, optional, string } from "superstruct";

export const CreateCouponValidation = object({
	start: date(),
	end: date(),
	code: string(),
	percent: optional(number()),
	price: optional(number()),
});

export const UpdateCouponValidation = object({
	start: optional(date()),
	end: optional(date()),
	code: optional(string()),
	percent: optional(number()),
	price: optional(number()),
});
