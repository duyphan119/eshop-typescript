import { array, nullable, number, object, optional, size, string } from "superstruct";

export const CreateOrderValidation = object({
	city: string(),
	district: string(),
	ward: string(),
	address: string(),
	description: optional(string()),
	phone: string(),
	fullName: string(),
	totalPrice: number(),
	shippingPrice: optional(number()),
	couponId: optional(number()),
	paymentMethodId: optional(number()),
	orderStatusId: optional(number()),
});

export const UpdateOrderValidation = object({
	orderStatusId: optional(number()),
});
