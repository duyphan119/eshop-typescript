import { Banner } from "@prisma/client";
import { assert } from "superstruct";
import { CreateBannerDTO, GetAllBannersDTO, UpdateBannerDTO } from "../dto/banner.dto";
import { db } from "../utils/db.server";
import { GetAllResponse, BatchPayload } from "../utils/types";
import { CreateBannerValidation, UpdateBannerValidation } from "../validation/banner.validation";

class BannerService {
	static async getAllBanners(queryParams: GetAllBannersDTO): Promise<GetAllResponse<Banner>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = {
			...(queryParams.slug ? { slug: { contains: queryParams.slug, mode: "insensitive" } } : {}),
			...(queryParams.metaName
				? {
						meta: {
							name: queryParams.metaName,
						},
				  }
				: {}),
			...(queryParams.isShow ? { isShow: queryParams.isShow === "true" } : {}),
		};
		const items = await db.banner.findMany({
			where,
			orderBy: {
				[queryParams.sortBy || "id"]: queryParams.sortType || "desc",
			},
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
		});

		const count = await db.banner.count({ where });

		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}
	static async getBannerById(id: number): Promise<Banner | null> {
		return db.banner.findFirst({ where: { id } });
	}
	static async createBanner(input: CreateBannerDTO): Promise<Banner> {
		assert(input, CreateBannerValidation);
		const { slug, metaId, thumbnail, description, isShow } = input;
		return db.banner.create({
			data: { slug, metaId, thumbnail, description: description || "", isShow },
		});
	}

	static async updateBanner(id: number, input: UpdateBannerDTO): Promise<Banner> {
		assert(input, UpdateBannerValidation);
		const { slug, metaId, thumbnail, description, isShow } = input;
		return db.banner.update({
			data: {
				...(slug ? { slug } : {}),
				...(metaId ? { metaId } : {}),
				...(thumbnail ? { thumbnail } : {}),
				...(description ? { description } : {}),
				...(isShow ? { isShow } : {}),
			},
			where: { id },
		});
	}

	static async deleteBanner(id: number): Promise<Banner> {
		return db.banner.delete({
			where: { id },
		});
	}

	static async deleteManyBanners({ ids }: { ids: number[] }): Promise<BatchPayload> {
		return db.banner.deleteMany({
			where: { id: { in: ids } },
		});
	}
}

export default BannerService;
