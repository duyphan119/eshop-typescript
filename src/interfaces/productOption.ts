import React from "react";
import { ExtraPayloadType } from "./common";
import { Product } from "./product";
import { ProductOptionValue } from "./productOptionValue";

export interface ProductOption {
	key?: string | number | React.Key;
	id?: number;
	createdAt?: string;
	updatedAt?: string;
	title: string;
	amount: number;
	sku: string;
	productId: number;
	product?: Product;
	variantValues?: ProductOptionValue[];
	productOptionValues?: ProductOptionValue[];
	thumbnail: string;
	weight: number;
}
export interface ProductOptionHasValue extends ProductOption {
	variantValueIds: number[];
	file?: File;
}
export interface AddManyProductOptionPayload extends ExtraPayloadType {
	productOptions: ProductOptionHasValue[];
}

export interface CreateProductOption {
	title: string;
	amount: number;
	sku: string;
	productId: number;
	thumbnail: string;
	weight?: number;
}
