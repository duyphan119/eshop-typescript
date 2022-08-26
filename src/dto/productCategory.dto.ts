import { QueryParams } from "../utils/types";

export type CreateProductCategoryDTO = {
	productId: number;
	categoryId: number;
};
export type GetAllProductCategoriesDTO = QueryParams & {
	categoryDepth?: string;
	productId?: string;
	categoryId?: string;
};
export type DeleteManyProductCategoriesDTO = {
	productIds: number[];
	categoryIds: number[];
};
