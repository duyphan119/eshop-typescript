import { Coupon } from "@prisma/client";
import { assert } from "superstruct";
import { CreateCouponDTO, GetAllCouponsDTO, UpdateCouponDTO } from "../dto/coupon.dto";
import { db } from "../utils/db.server";
import { GetAllResponse, BatchPayload } from "../utils/types";
import { CreateCouponValidation, UpdateCouponValidation } from "../validation/coupon.validation";

class CouponService {
	static async getAllCoupons(queryParams: GetAllCouponsDTO): Promise<GetAllResponse<Coupon>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = {
			deletedAt: null,
			...(queryParams.start ? { start: { gte: new Date(queryParams.start) } } : {}),
			...(queryParams.end ? { end: { lte: new Date(queryParams.end) } } : {}),
			...(queryParams.price ? { price: parseInt(queryParams.price) } : {}),
			...(queryParams.percent ? { percent: parseInt(queryParams.percent) } : {}),
			...(queryParams.code ? { code: queryParams.code } : {}),
		};
		const items = await db.coupon.findMany({
			where,
			orderBy: {
				[queryParams.sortBy || "id"]: queryParams.sortType || "desc",
			},
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
		});

		const count = await db.coupon.count({ where });

		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}
	static async getCouponById(id: number): Promise<Coupon | null> {
		return db.coupon.findFirst({ where: { id, deletedAt: null } });
	}
	static async createCoupon(input: CreateCouponDTO): Promise<Coupon> {
		assert(input, CreateCouponValidation);
		const { code, price, percent, start, end } = input;
		return db.coupon.create({
			data: { code, price: price || 0, percent: percent || 0, start, end },
		});
	}

	static async updateCoupon(id: number, input: UpdateCouponDTO): Promise<Coupon> {
		assert(input, UpdateCouponValidation);
		const { code, price, percent, start, end } = input;
		return db.coupon.update({
			data: {
				...(code ? { code } : {}),
				...(price ? { price } : {}),
				...(percent ? { percent } : {}),
				...(start ? { start } : {}),
				...(end ? { end } : {}),
			},
			where: { id },
		});
	}

	static async deleteCoupon(id: number): Promise<Coupon> {
		return db.coupon.delete({ where: { id } });
	}

	static async deleteManyCoupons({ ids }: { ids: number[] }): Promise<BatchPayload> {
		return db.coupon.deleteMany({ where: { id: { in: ids } } });
	}
}

export default CouponService;
