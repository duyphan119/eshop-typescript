import { Order } from "./order";
import { ProductOption } from "./productOption";

export interface OrderItem {
	order?: Order;
	productOption?: ProductOption;
	orderId: number;
	productOptionId: number;
	assignedAt: string;
	quantity: number;
	price: number;
}
