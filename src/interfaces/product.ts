import { ExtraPayloadType, GetExtraPayloadType, QueryParams, SearchParams, TokenPayload } from "./common";
import { ProductCategory } from "./productCategory";
import { ProductOption } from "./productOption";
export interface Product {
	key?: string | number | React.Key;
	id: number;
	price: number;
	newPrice: number;
	slug: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	description: string;
	summary: string;
	thumbnail: string;
	productOptions?: ProductOption[];
	productCategories?: ProductCategory[];
	categories?: ProductCategory[];
}
export interface ProductPayload extends Product, ExtraPayloadType {}
export interface DeleteManyProductPayload extends ExtraPayloadType {
	listId: React.Key[] | number[];
}
export interface ProductDetailPayload {
	queryParams?: QueryParams;
	slug: string;
}

interface NoOption extends SearchParams {
	justNoOptions?: boolean;
}

export interface ProductQueryParams extends GetExtraPayloadType {
	params?: NoOption;
}

export interface GetProductQueryParams extends QueryParams {
	price?: string;
	slug?: string;
	name?: string;
	newPrice?: string;
}
export interface GetProductPayload extends ExtraPayloadType {
	params?: GetProductQueryParams;
}

export type CreateProduct = {
	name: string;
	newPrice: number;
	slug: string;
	thumbnail: string;
	price: number;
	description: string;
};

export type UpdateProduct = {
	name?: string;
	newPrice?: number;
	slug?: string;
	thumbnail?: string;
	price?: number;
	description?: string;
};
export type CreateProductPayload = {
	data: CreateProduct;
} & TokenPayload;

export type UpdateProductPayload = {
	id: number;
	data: UpdateProduct;
} & TokenPayload;

export type DeleteProductPayload = {
	id: number;
} & TokenPayload;

export type DeleteManyProductsPayload = {
	ids: React.Key[];
} & TokenPayload;
