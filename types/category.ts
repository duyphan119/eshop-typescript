import { QueryParams } from "./common";

export interface GetCategoryQueryParams extends QueryParams {
	depth?: number;
	showProducts?: boolean;
	level?: number;
}

export type Category = {
	id?: number;
	createdAt?: Date;
	updatedAt?: Date;
	title: string;
	name: string;
	slug: string;
	isDisplayOnHeader: boolean;
	parentId?: number;
	thumbnail: string;
	groupCategoryId: number;
	parent?: Category;
	children?: Category[];
};
