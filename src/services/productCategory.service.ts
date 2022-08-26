import { ProductCategory } from "@prisma/client";
import { CreateProductCategoryValidation } from "../validation/productCategory.validation";
import { assert } from "superstruct";
import { CreateProductCategoryDTO, DeleteManyProductCategoriesDTO, GetAllProductCategoriesDTO } from "../dto/productCategory.dto";
import { generateIncludeParentCategory } from "../utils";
import { db } from "../utils/db.server";
import { BatchPayload, GetAllResponse } from "../utils/types";

class ProductCategoryService {
	static async getAllProductCategories(queryParams: GetAllProductCategoriesDTO): Promise<GetAllResponse<ProductCategory>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = {
			...(queryParams.categoryId ? { categoryId: parseInt(queryParams.categoryId), product: { deletedAt: null } } : {}),
			...(queryParams.productId ? { productId: parseInt(queryParams.productId), category: { deletedAt: null } } : {}),
		};
		const items = await db.productCategory.findMany({
			where,
			orderBy: { [queryParams.categoryId ? "category" : "product"]: { [queryParams.sortBy || "id"]: queryParams.sortType || "desc" } },
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
			include: {
				product: { include: { productOptions: { include: { variantValues: { include: { variantValue: { include: { variant: true } } } } } } } },
				category: {
					include: generateIncludeParentCategory(parseInt(queryParams.categoryDepth || "1")).include,
				},
			},
		});

		const count = await db.productCategory.count({ where });
		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}

	static async createProductCategory(input: CreateProductCategoryDTO): Promise<ProductCategory> {
		assert(input, CreateProductCategoryValidation);
		const { categoryId, productId } = input;
		return db.productCategory.create({
			data: { categoryId, productId },
		});
	}

	static async createManyProductCategories(input: Array<CreateProductCategoryDTO>): Promise<BatchPayload> {
		assert(input[0], CreateProductCategoryValidation);
		return db.productCategory.createMany({
			data: input,
		});
	}

	static async deleteManyProductCategories(input: DeleteManyProductCategoriesDTO): Promise<BatchPayload> {
		assert(input, CreateProductCategoryValidation);
		const { categoryIds, productIds } = input;
		return db.productCategory.deleteMany({
			where: { AND: { categoryId: { in: categoryIds }, productId: { in: productIds } } },
		});
	}
}

export default ProductCategoryService;
