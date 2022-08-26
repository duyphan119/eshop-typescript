import { QueryParams } from "../utils/types";

export type CreateProductOptionDTO = {
	weight: number;
	title: string;
	productId: number;
	amount: number;
	sku: string;
	thumbnail?: string;
};

export type UpdateProductOptionDTO = {
	weight?: number;
	title?: string;
	productId?: number;
	amount?: number;
	sku?: string;
	thumbnail?: string;
};

export type GetAllProductOptionsDTO = QueryParams & {
	title?: string;
	amount?: string;
	productId?: string;
};
