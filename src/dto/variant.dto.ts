import { QueryParams } from "../utils/types";

export type CreateVariantDTO = {
	name: string;
};

export type UpdateVariantDTO = {
	name?: string;
};

export type GetAllVariantsDTO = QueryParams & {
	name?: string;
};
