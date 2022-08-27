import React from "react";
import { QueryParams } from "./common";
import { Order } from "./order.interface";
export interface OrderStatus {
	key?: string | number | React.Key;
	id: number;
	createdAt: string;
	updatedAt: string;
	name: string;
	type: string;
	orders?: Array<Order>;
}
export type GetAllOrderStatuses = {
	name?: string;
} & QueryParams;
