import { QueryParams } from "../utils/types";

export type CreateCategoryDTO = {
	title: string;
	slug: string;
	name: string;

	description?: string;
	thumbnail?: string;
	categoryTypeId: number;
	parentId: number | null;
};

export type UpdateCategoryDTO = {
	title?: string;
	slug?: string;
	name?: string;

	description?: string;
	thumbnail?: string;
	categoryTypeId?: number;
	parentId?: number | null;
};

export type GetAllCategoriesDTO = QueryParams & {
	title?: string;
	slug?: string;
	name?: string;
	depth?: string;
	parentId?: string;
};
