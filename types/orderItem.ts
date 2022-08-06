import { Order } from "./order";
import { ProductOption } from "./productOption";

export type OrderItem = {
	productOptionId: number;
	productOption?: ProductOption;
	price: number;
	quantity: number;
	createdAt?: Date;
	updatedAt?: Date;
	id?: number;
	orderId: number;
	order?: Order;
};
