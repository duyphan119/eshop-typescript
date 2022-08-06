import { Banner } from "./banner";
import { QueryParams } from "./common";

export interface GetMetaQueryParams extends QueryParams {}

export type Meta = {
	id?: number;
	createdAt?: Date;
	updatedAt?: Date;
	name: string;
	banners?: Banner[];
};
