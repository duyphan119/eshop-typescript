import { generateIncludeChildrenCategory } from "../utils";
import { CreateCategoryDTO, GetAllCategoriesDTO, UpdateCategoryDTO } from "../dto/category.dto";
import { Category } from "@prisma/client";
import { db } from "../utils/db.server";
import { assert } from "superstruct";
import { CreateCategoryValidation, UpdateCategoryValidation } from "../validation/category.validation";
import { BatchPayload } from "../utils/interfaces";
import { GetAllResponse } from "../utils/types";

class CategoryService {
	static async getAllCategories(queryParams: GetAllCategoriesDTO): Promise<GetAllResponse<Category>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = {
			deletedAt: null,
			...(queryParams.title
				? {
						title: {
							contains: queryParams.title,
							mode: "insensitive",
						},
				  }
				: {}),
			...(queryParams.name
				? {
						name: {
							contains: queryParams.name,
							mode: "insensitive",
						},
				  }
				: {}),
			...(queryParams.slug
				? {
						slug: {
							contains: queryParams.slug,
							mode: "insensitive",
						},
				  }
				: {}),
			...(queryParams.parentId
				? {
						parentId: queryParams.parentId === "null" ? null : parseInt(queryParams.parentId),
				  }
				: {}),
		};
		const items = await db.category.findMany({
			where,
			orderBy: {
				[queryParams.sortBy || "id"]: queryParams.sortType || "desc",
			},
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
			include: {
				categoryType: true,
				...generateIncludeChildrenCategory(queryParams.depth ? parseInt(queryParams.depth) : 1),
			},
		});

		const count = await db.category.count({ where });

		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}
	static async createCategory(input: CreateCategoryDTO): Promise<Category> {
		assert(input, CreateCategoryValidation);
		const { title, name, slug, description, thumbnail, categoryTypeId, parentId } = input;
		return db.category.create({
			data: {
				title,
				name,
				slug,
				thumbnail,
				parentId,
				categoryTypeId,
				description,
			},
		});
	}

	static async updateCategory(id: number, input: UpdateCategoryDTO): Promise<Category> {
		assert(input, UpdateCategoryValidation);
		const { title, name, slug, description, thumbnail, categoryTypeId, parentId } = input;
		return db.category.update({
			data: {
				...(title ? { title } : {}),
				...(name ? { name } : {}),
				...(slug ? { slug } : {}),
				...(description ? { description } : {}),
				...(thumbnail ? { thumbnail } : {}),
				...(categoryTypeId ? { categoryTypeId } : {}),
				...(parentId ? { parentId } : {}),
			},
			where: {
				id,
			},
		});
	}

	static async deleteCategory(id: number): Promise<Category> {
		return db.category.delete({
			where: { id },
		});
	}

	static async deleteManyCategories({ ids }: { ids: number[] }): Promise<BatchPayload> {
		return db.category.deleteMany({
			where: { id: { in: ids } },
		});
	}
}

export default CategoryService;
