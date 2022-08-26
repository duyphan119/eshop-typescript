import { QueryParams } from "../utils/types";

export type CreateProductDTO = {
	price: number;
	slug: string;
	name: string;
	newPrice?: number;
	description?: string;
	thumbnail?: string;
};

export type UpdateProductDTO = {
	price?: number;
	slug?: string;
	name?: string;
	newPrice?: number;
	description?: string;
	thumbnail?: string;
};

export type GetAllProductsDTO = QueryParams & {
	price?: string;
	slug?: string;
	name?: string;
	newPrice?: string;
};
