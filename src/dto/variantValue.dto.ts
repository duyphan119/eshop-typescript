import { QueryParams } from "../utils/types";

export type CreateVariantValueDTO = {
	name: string;
	variantId: number;
};

export type UpdateVariantValueDTO = {
	name?: string;
	variantId?: string;
};

export type GetAllVariantValuesDTO = QueryParams & {
	name?: string;
};
