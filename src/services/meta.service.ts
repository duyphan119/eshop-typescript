import { Meta } from "@prisma/client";
import { assert } from "superstruct";
import { CreateMetaDTO, GetAllMetaDTO, UpdateMetaDTO } from "../dto/meta.dto";
import { db } from "../utils/db.server";
import { GetAllResponse, BatchPayload } from "../utils/types";
import { CreateMetaValidation, UpdateMetaValidation } from "../validation/meta.validation";

class MetaService {
	static async getAllMeta(queryParams: GetAllMetaDTO): Promise<GetAllResponse<Meta>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = {
			deletedAt: null,
			...(queryParams.name ? { name: { contains: queryParams.name, mode: "insensitive" } } : {}),
		};
		const items = await db.meta.findMany({
			where,
			orderBy: {
				[queryParams.sortBy || "id"]: queryParams.sortType || "desc",
			},
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
		});

		const count = await db.meta.count({ where });

		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}
	static async getMetaById(id: number): Promise<Meta | null> {
		return db.meta.findFirst({ where: { id, deletedAt: null } });
	}
	static async createMeta(input: CreateMetaDTO): Promise<Meta> {
		assert(input, CreateMetaValidation);
		const { name, description } = input;
		return db.meta.create({
			data: { name, description: description || "" },
		});
	}

	static async updateMeta(id: number, input: UpdateMetaDTO): Promise<Meta> {
		assert(input, UpdateMetaValidation);
		const { name, description } = input;
		return db.meta.update({
			data: {
				...(name ? { name } : {}),
				...(description ? { description } : {}),
			},
			where: {
				id,
			},
		});
	}

	static async deleteMeta(id: number): Promise<Meta> {
		return db.meta.delete({
			where: { id },
		});
	}

	static async deleteManyMeta({ ids }: { ids: number[] }): Promise<BatchPayload> {
		return db.meta.deleteMany({
			where: { id: { in: ids } },
		});
	}
}

export default MetaService;
