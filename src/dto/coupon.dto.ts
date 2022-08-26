import { QueryParams } from "../utils/types";

export type CreateCouponDTO = {
	percent?: number;
	price?: number;
	code: string;
	start: Date;
	end: Date;
};
export type UpdateCouponDTO = {
	percent?: number;
	price?: number;
	code?: string;
	start?: Date;
	end?: Date;
};
export type GetAllCouponsDTO = QueryParams & {
	start?: string;
	end?: string;
	code?: string;
	percent?: string;
	price?: string;
};
