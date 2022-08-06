import { QueryParams } from "./common";
import { Meta } from "./meta";

export interface GetBannerQueryParams extends QueryParams {
	metaName?: string;
	visible?: boolean;
}

export type Banner = {
	id?: number;
	createdAt?: Date;
	updatedAt?: Date;
	slug: string;
	visible: boolean;
	thumbnail: string;
	metaId: number;
	meta?: Meta;
};
