import React from "react";
import { Category } from "./category";
import { ExtraPayloadType, QueryParams, TokenPayload } from "./common";
export interface CategoryType {
	key?: string | number | React.Key;
	id: number;
	name: string;
	createdAt?: string;
	updatedAt?: string;
	categories?: Category[];
}
export interface CategoryTypePayload extends ExtraPayloadType {
	body: CategoryType;
}
export interface DeleteManyCategoryTypePayload extends ExtraPayloadType {
	listId: React.Key[] | number[];
}
export type CreateCategoryType = {
	name: string;
};

export type UpdateCategoryType = {
	name?: string;
};
export type CreateCategoryTypePayload = {
	data: CreateCategoryType;
} & TokenPayload;

export type UpdateCategoryTypePayload = {
	id: number;
	data: UpdateCategoryType;
} & TokenPayload;

export type DeleteCategoryTypePayload = {
	id: number;
} & TokenPayload;

export type DeleteManyCategoryTypesPayload = {
	ids: React.Key[];
} & TokenPayload;

export interface GetCategoryTypeQueryParams extends QueryParams {
	all?: boolean;
	name?: string;
}
export interface GetCategoryTypePayload extends TokenPayload {
	params?: GetCategoryTypeQueryParams;
}
