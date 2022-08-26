import React from "react";
import { Category } from "./category";
import { QueryParams } from "./common";
import { Product } from "./product";

export interface ProductCategory {
	key?: string | number | React.Key;
	id?: number;
	categoryId: number;
	productId: number;
	createdAt?: string;
	updatedAt?: string;
	category?: Category;
	product?: Product;
}

export interface GetProducts extends QueryParams {
	tags?: string;
}

export interface GetProductsQueryParams {
	params?: GetProducts;
	categoryId: number;
}

export interface CreateProductCategory {
	categoryId: number;
	productId: number;
}
