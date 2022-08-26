import React from "react";
import { Cart } from "./cart";
import { ExtraPayloadType, QueryParams, TokenPayload } from "./common";
import { UserRole } from "./userRoles";
export interface User {
	key?: string | number | React.Key;
	id: number;
	createdAt?: string;
	updatedAt?: string;
	email: string;
	firstName?: string;
	middleName?: string;
	lastName?: string;
	fullName: string;
	phone: string;
	avatar: string;
	city?: string;
	district?: string;
	ward?: string;
	address?: string;
	roles?: UserRole[];
	cart?: Cart | null;
}
export interface GetUserQueryParams extends QueryParams {
	fullName?: string;
	email?: string;
	phone?: string;
}
export interface GetUserPayload extends ExtraPayloadType {
	params?: GetUserQueryParams;
}
export type CreateUser = {
	fullName: string;
	avatar: string;
	email: string;
	password: string;
	phone: string;
};

export type UpdateUser = {
	fullName?: string;
	avatar?: string;
	email?: string;
	phone?: string;
};

export type CreateUserPayload = {
	data: CreateUser;
} & TokenPayload;

export type UpdateUserPayload = {
	id: number;
	data: UpdateUser;
} & TokenPayload;

export type DeleteUserPayload = {
	id: number;
} & TokenPayload;

export type DeleteManyUserPayload = {
	ids: React.Key[];
} & TokenPayload;
