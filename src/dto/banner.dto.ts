import { QueryParams } from "../utils/types";

export type CreateBannerDTO = {
	slug: string;
	isShow: boolean;
	thumbnail: string;
	metaId: number;
	description?: string;
};

export type UpdateBannerDTO = {
	slug?: string;
	isShow?: boolean;
	thumbnail?: string;
	metaId?: number;
	description?: string;
};

export type GetAllBannersDTO = QueryParams & {
	slug?: string;
	metaName?: string;
	isShow?: string;
};
