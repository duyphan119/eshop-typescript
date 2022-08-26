import { array, number, object } from "superstruct";

export const CreateOrderItemValidation = array(
	object({
		productOptionId: number(),
		quantity: number(),
		price: number(),
		orderId: number(),
	})
);
