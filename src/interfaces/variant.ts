import React from "react";
import { ExtraPayloadType, QueryParams, TokenPayload } from "./common";
import { VariantValue } from "./variantValue";

export interface Variant {
	key: string | number | React.Key;
	id: number;
	createdAt: string;
	updatedAt: string;
	name: string;
	variantValues: VariantValue[];
}

export interface VariantPayload extends Variant, ExtraPayloadType {}

export interface GetVariantQueryParams extends QueryParams {
	name?: string;
}
export interface GetVariantPayload extends ExtraPayloadType {
	params?: GetVariantQueryParams;
}

export type CreateVariant = {
	name: string;
};

export type UpdateVariant = {
	name?: string;
};
export type CreateVariantPayload = {
	data: CreateVariant;
} & TokenPayload;

export type UpdateVariantPayload = {
	id: number;
	data: UpdateVariant;
} & TokenPayload;

export type DeleteVariantPayload = {
	id: number;
} & TokenPayload;

export type DeleteManyVariantsPayload = {
	ids: React.Key[];
} & TokenPayload;
