import { VariantValue } from "@prisma/client";
import { assert } from "superstruct";
import { CreateVariantValueDTO, GetAllVariantValuesDTO, UpdateVariantValueDTO } from "../dto/variantValue.dto";
import { db } from "../utils/db.server";
import { GetAllResponse, BatchPayload } from "../utils/types";
import { CreateVariantValueValidation, UpdateVariantValueValidation } from "../validation/variantValue.validation";

class VariantValueService {
	static async getAllVariantValues(queryParams: GetAllVariantValuesDTO): Promise<GetAllResponse<VariantValue>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = {
			deletedAt: null,
			...(queryParams.name ? { name: { contains: queryParams.name, mode: "insensitive" } } : {}),
		};
		const items = await db.variantValue.findMany({
			where,
			orderBy: {
				[queryParams.sortBy || "id"]: queryParams.sortType || "desc",
			},
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
			include: { variant: true },
		});

		const count = await db.variantValue.count({ where });

		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}
	static async getVariantValueById(id: number): Promise<VariantValue | null> {
		return db.variantValue.findFirst({ where: { id, deletedAt: null } });
	}
	static async createVariantValue(input: CreateVariantValueDTO): Promise<VariantValue> {
		assert(input, CreateVariantValueValidation);
		const { name, variantId } = input;
		return db.variantValue.create({
			data: { name, variantId },
		});
	}

	static async updateVariantValue(id: number, input: UpdateVariantValueDTO): Promise<VariantValue> {
		assert(input, UpdateVariantValueValidation);
		const { name, variantId } = input;
		return db.variantValue.update({
			data: { ...(name ? { name } : {}), ...(variantId ? { variantId } : {}) },
			where: { id },
		});
	}

	static async deleteVariantValue(id: number): Promise<VariantValue> {
		return db.variantValue.delete({ where: { id } });
	}

	static async deleteManyVariantValues({ ids }: { ids: number[] }): Promise<BatchPayload> {
		return db.variantValue.deleteMany({ where: { id: { in: ids } } });
	}
}

export default VariantValueService;
