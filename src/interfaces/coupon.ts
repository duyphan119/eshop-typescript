import React from "react";
import { QueryParams } from "./common";
import { Order } from "./order";
export interface Coupon {
	key?: string | number | React.Key;
	id: number;
	createdAt: string;
	updatedAt: string;
	start: string;
	end: string;
	code: string;
	percent: number;
	price: number;
	orders?: Array<Order>;
}
export type GetAllCoupons = {
	name?: string;
} & QueryParams;
