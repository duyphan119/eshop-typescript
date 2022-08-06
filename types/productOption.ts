import { QueryParams } from "./common";
import { OrderItem } from "./orderItem";
import { Product } from "./product";
import { VariantValue } from "./variantValue";

export interface GetProductOptionQueryParams extends QueryParams {}

export type ProductOption = {
	id?: number;
	createdAt?: Date;
	updatedAt?: Date;
	title: string;
	productId: number;
	product?: Product;
	variantValueId: number;
	variantValues?: VariantValue[];
	amount: number;
	thumbnail: string;
	orderItems?: OrderItem[];
};
