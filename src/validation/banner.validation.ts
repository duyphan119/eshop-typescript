import { object, optional, string, number, boolean } from "superstruct";

export const CreateBannerValidation = object({
	slug: string(),
	thumbnail: string(),
	description: optional(string()),
	metaId: number(),
	isShow: boolean(),
});

export const UpdateBannerValidation = object({
	slug: optional(string()),
	thumbnail: optional(string()),
	description: optional(string()),
	metaId: optional(number()),
	isShow: optional(boolean()),
});
