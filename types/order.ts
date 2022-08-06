import { QueryParams } from "./common";
import { OrderItem } from "./orderItem";
import { OrderStatus } from "./orderStatus";
import { User } from "./user";

export interface GetOrderQueryParams extends QueryParams {}

export interface CreateOrderDto {
	fullName: string;
	phone: string;
	city: string;
	district: string;
	ward: string;
	address: string;
	description: string;
	totalPrice: number;
	orderItems: Array<{
		productOptionId: number;
		price: number;
		quantity: number;
	}>;
}

export type Order = {
	fullName: string;
	phone: string;
	city: string;
	district: string;
	ward: string;
	address: string;
	description: string;
	totalPrice: number;
	createdAt?: Date;
	updatedAt?: Date;
	id?: number;
	orderStatusId: number;
	orderStatus?: OrderStatus;
	orderItems?: OrderItem[];
	userId: number;
	user?: User;
};
