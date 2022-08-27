import React from "react";
import { QueryParams } from "./common";
import { Order } from "./order.interface";
export interface PaymentMethod {
	key?: string | number | React.Key;
	id: number;
	createdAt: string;
	updatedAt: string;
	name: string;
	orders?: Array<Order>;
}
export type GetAllPaymentMethod = {
	name?: string;
} & QueryParams;
