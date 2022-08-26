import { CategoryType } from "@prisma/client";
import { assert } from "superstruct";
import { CreateCategoryTypeDTO, GetAllCategoryTypesDTO, UpdateCategoryTypeDTO } from "../dto/categoryType.dto";
import { db } from "../utils/db.server";
import { GetAllResponse, BatchPayload } from "../utils/types";
import { CreateCategoryTypeValidation, UpdateCategoryTypeValidation } from "../validation/categoryType.validation";

class CategoryTypeService {
	static async getAllCategoryTypes(queryParams: GetAllCategoryTypesDTO): Promise<GetAllResponse<CategoryType>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = {
			deletedAt: null,
			...(queryParams.name ? { name: { contains: queryParams.name, mode: "insensitive" } } : {}),
		};
		const items = await db.categoryType.findMany({
			where,
			orderBy: {
				[queryParams.sortBy || "id"]: queryParams.sortType || "desc",
			},
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
		});

		const count = await db.categoryType.count({ where });

		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}
	static async getCategoryTypeById(id: number): Promise<CategoryType | null> {
		return db.categoryType.findFirst({ where: { id, deletedAt: null } });
	}
	static async createCategoryType(input: CreateCategoryTypeDTO): Promise<CategoryType> {
		assert(input, CreateCategoryTypeValidation);
		const { name } = input;
		return db.categoryType.create({
			data: { name },
		});
	}

	static async updateCategoryType(id: number, input: UpdateCategoryTypeDTO): Promise<CategoryType> {
		assert(input, UpdateCategoryTypeValidation);
		const { name } = input;
		return db.categoryType.update({
			data: {
				...(name ? { name } : {}),
			},
			where: { id },
		});
	}

	static async deleteCategoryType(id: number): Promise<CategoryType> {
		return db.categoryType.delete({
			where: { id },
		});
	}

	static async deleteManyCategoryTypes({ ids }: { ids: number[] }): Promise<BatchPayload> {
		return db.categoryType.deleteMany({
			where: { id: { in: ids } },
		});
	}
}

export default CategoryTypeService;
