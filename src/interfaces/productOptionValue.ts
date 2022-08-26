import React from "react";
import { ProductOption } from "./productOption";
import { VariantValue } from "./variantValue";

export interface ProductOptionValue {
	key?: string | number | React.Key;
	id?: number;
	createdAt?: string;
	updatedAt?: string;
	name: string;
	variantValue?: VariantValue;
	variantValueId: number;
	productOptionId: number;
	productOption?: ProductOption;
}

export interface CreateProductOptionValue {
	productOptionId: number;
	variantValueId: number;
}
