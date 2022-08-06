import { Order } from "./order";

export type OrderStatus = {
	id?: number;
	createdAt?: string;
	updatedAt?: string;
	name: string;
	allowDelete: boolean;
	isFinish: boolean;
	isCancelled: boolean;
	orders?: Order[];
};
