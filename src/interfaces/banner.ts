import { QueryParams, SearchParams } from "interfaces/common";
import { ExtraPayloadType } from "./common";
import { Meta } from "./meta";
export interface Banner {
	key: string | number | React.Key;
	id: number;
	slug: string;
	createdAt: string;
	updatedAt: string;
	description: string;
	thumbnail: string;
	metaId: number;
	meta: Meta;
	isShow: boolean;
}
export interface BannerPayload extends ExtraPayloadType {
	body: Banner;
}
export interface DeleteManyBannerPayload extends ExtraPayloadType {
	listId: React.Key[] | number[];
}
export interface BannerQuery extends SearchParams {
	metaName?: string;
}

export interface GetBannerQueryParams extends QueryParams {
	metaName?: string;
	slug?: string;
	isShow?: string;
}
