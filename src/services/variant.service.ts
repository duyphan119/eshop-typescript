import { Variant } from "@prisma/client";
import { assert } from "superstruct";
import { CreateVariantDTO, GetAllVariantsDTO, UpdateVariantDTO } from "../dto/variant.dto";
import { db } from "../utils/db.server";
import { GetAllResponse, BatchPayload } from "../utils/types";
import { CreateVariantValidation, UpdateVariantValidation } from "../validation/variant.validation";

class VariantService {
	static async getAllVariants(queryParams: GetAllVariantsDTO): Promise<GetAllResponse<Variant>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = {
			deletedAt: null,
			...(queryParams.name ? { name: { contains: queryParams.name, mode: "insensitive" } } : {}),
		};
		const items = await db.variant.findMany({
			where,
			orderBy: {
				[queryParams.sortBy || "id"]: queryParams.sortType || "desc",
			},
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
			include: {
				variantValues: true,
			},
		});

		const count = await db.variant.count({ where });

		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}
	static async getVariantById(id: number): Promise<Variant | null> {
		return db.variant.findFirst({ where: { id, deletedAt: null } });
	}
	static async createVariant(input: CreateVariantDTO): Promise<Variant> {
		assert(input, CreateVariantValidation);
		const { name } = input;
		return db.variant.create({
			data: { name },
		});
	}

	static async updateVariant(id: number, input: UpdateVariantDTO): Promise<Variant> {
		assert(input, UpdateVariantValidation);
		const { name } = input;
		return db.variant.update({
			data: { ...(name ? { name } : {}) },
			where: { id },
		});
	}

	static async deleteVariant(id: number): Promise<Variant> {
		return db.variant.delete({ where: { id } });
	}

	static async deleteManyVariants({ ids }: { ids: number[] }): Promise<BatchPayload> {
		return db.variant.deleteMany({ where: { id: { in: ids } } });
	}
}

export default VariantService;
