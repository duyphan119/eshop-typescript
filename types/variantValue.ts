import { QueryParams } from "./common";
import { ProductOption } from "./productOption";
import { Variant } from "./variant";

export interface GetVariantValueQueryParams extends QueryParams {}

export type VariantValue = {
	id?: number;
	createdAt?: Date;
	updatedAt?: Date;
	name: string;
	variantId: number;
	variant?: Variant;
	productOptions?: ProductOption[];
};
