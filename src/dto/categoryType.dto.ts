import { QueryParams } from "../utils/types";

export type CreateCategoryTypeDTO = {
	name: string;
};

export type UpdateCategoryTypeDTO = {
	name?: string;
};

export type GetAllCategoryTypesDTO = QueryParams & {
	name?: string;
};
