import React from "react";
import { QueryParams, TokenPayload } from "./common";
import { PaymentMethod } from "./paymentMethod";
import { OrderStatus } from "./orderStatus.interface";
import { Coupon } from "./coupon";
import { OrderItem } from "./orderItem";

export interface Order {
	id: number;
	key?: React.Key;
	createdAt: Date;
	updatedAt: Date;
	city: string;
	address: string;
	ward: string;
	totalPrice: number;
	paymentMethodId: number;
	shippingPrice: number;
	fullName: string;
	phone: string;
	district: string;
	description: string;
	couponId: number;
	orderStatusId: number;
	paymentMethod?: PaymentMethod;
	orderStatus?: OrderStatus;
	coupon?: Coupon;
	orderItems?: Array<OrderItem>;
}

export type CreateOrder = {
	city: string;
	ward: string;
	district: string;
	address: string;
	totalPrice: number;
	shippingPrice: number;
	fullName: string;
	phone: string;
	paymentMethodId: number;
	orderStatusId?: number;
	couponId?: number;
	description?: string;
};

export type UpdateOrder = {
	city?: string;
	ward?: string;
	district?: string;
	address?: string;
	totalPrice?: number;
	shippingPrice?: number;
	fullName?: string;
	phone?: string;
	orderStatusId?: number;
	paymentMethodId?: number;
	couponId?: number;
	description?: string;
};

export type GetAllOrders = {} & QueryParams;

export type GetAllOrdersPayload = {
	params: GetAllOrders;
} & TokenPayload;

export type UpdateOrderPayload = {
	data: UpdateOrder;
} & TokenPayload;
