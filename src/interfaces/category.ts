import React from "react";
import { ExtraPayloadType, QueryParams, TokenPayload } from "./common";
import { CategoryType } from "./categoryType";
import { ProductCategory } from "./productCategory";
export interface Category {
	key?: string | number | React.Key;
	id: number;
	parentId: number | null;
	slug: string;
	title: string;
	description: string;
	name: string;
	thumbnail?: string;
	createdAt?: string;
	updatedAt?: string;
	parent?: null | Category;
	children?: Category[];
	categoryTypeId?: number;
	categoryType?: CategoryType;
	productCategories?: ProductCategory[];
	categories?: ProductCategory[];
}
export interface CategoryPayload extends Category, ExtraPayloadType {}
export interface DeleteManyCategoryPayload extends ExtraPayloadType {
	listId: React.Key[] | number[];
}
export interface CategoryQueryParams extends QueryParams {
	all?: boolean;
	depth?: number;
}

export interface GetCategoryQueryParams extends QueryParams {
	depth?: number;
	name?: string;
	title?: string;
	slug?: string;
	parentId?: string;
}
export interface GetCategoryPayload extends ExtraPayloadType {
	params?: GetCategoryQueryParams;
}

export type CreateCategory = {
	name: string;
	title: string;
	slug: string;
	thumbnail: string;
	categoryTypeId: number;
	parentId: number | null;
	description: string;
};

export type UpdateCategory = {
	name?: string;
	title?: string;
	slug?: string;
	thumbnail?: string;
	categoryTypeId?: number;
	parentId?: number | null;
	description?: string;
};
export type CreateCategoryPayload = {
	data: CreateCategory;
} & TokenPayload;

export type UpdateCategoryPayload = {
	id: number;
	data: UpdateCategory;
} & TokenPayload;

export type DeleteCategoryPayload = {
	id: number;
} & TokenPayload;

export type DeleteManyCategoriesPayload = {
	ids: React.Key[];
} & TokenPayload;
