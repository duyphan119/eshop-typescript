import { QueryParams } from "./common";
import { ProductOption } from "./productOption";

export interface GetProductQueryParams extends QueryParams {
	slug?: string;
}

export type Product = {
	id?: number;
	createdAt?: Date;
	updatedAt?: Date;
	summary?: string;
	description?: string;
	name: string;
	slug: string;
	thumbnail: string;
	price: number;
	newPrice: number;
	productOptions?: ProductOption[];
};
