import { QueryParams } from "./common";
import { VariantValue } from "./variantValue";

export interface GetVariantQueryParams extends QueryParams {}

export type Variant = {
	id?: number;
	createdAt?: Date;
	updatedAt?: Date;
	name: string;
	variantValues?: VariantValue[];
};
