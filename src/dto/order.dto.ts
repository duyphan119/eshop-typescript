import { QueryParams } from "../utils/types";

export type CreateOrderDTO = {
	city: string;
	district: string;
	address: string;
	ward: string;
	phone: string;
	fullName: string;
	totalPrice: number;
	shippingPrice: number;
	orderStatusId: number;
	paymentMethodId: number;
	description?: string;
	userId?: number;
	couponId?: number;
};

export type UpdateOrderDTO = {
	orderStatusId?: number;
};

export type GetAllOrdersDTO = QueryParams & {
	city?: string;
	ward?: string;
	district?: string;
	address?: string;
	phone?: string;
	fullName?: string;
	totalPrice?: string;
	shippingPrice?: string;
	createdAt?: string;
};
