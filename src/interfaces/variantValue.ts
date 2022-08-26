import { ExtraPayloadType, QueryParams, TokenPayload } from "./common";
import { ProductOptionValue } from "./productOptionValue";
import { Variant } from "./variant";

export interface VariantValue {
	key?: string | number | React.Key;
	id: number;
	createdAt: string;
	updatedAt: string;
	name: string;
	variant?: Variant;
	variantId: number;
	productOptionValues?: ProductOptionValue[];
}
export interface VariantValuePayload extends VariantValue, ExtraPayloadType {}

export interface GetVariantValueQueryParams extends QueryParams {
	variantId?: string;
	name?: string;
}
export interface GetVariantValuePayload extends ExtraPayloadType {
	params?: GetVariantValueQueryParams;
}

export type CreateVariantValue = {
	name: string;
	variantId: number;
};

export type UpdateVariantValue = {
	name?: string;
	variantId?: number;
};
export type CreateVariantValuePayload = {
	data: CreateVariantValue;
} & TokenPayload;

export type UpdateVariantValuePayload = {
	id: number;
	data: UpdateVariantValue;
} & TokenPayload;

export type DeleteVariantValuePayload = {
	id: number;
} & TokenPayload;

export type DeleteManyVariantValuesPayload = {
	ids: React.Key[];
} & TokenPayload;
