import { QueryParams } from "../utils/types";

export type CreateMetaDTO = {
	name: string;
	description?: string;
};

export type UpdateMetaDTO = {
	name?: string;
	description?: string;
};

export type GetAllMetaDTO = QueryParams & {
	name?: string;
};
