import { ProductUser } from "@prisma/client";
import { assert } from "superstruct";
import { CreateProductUserDTO, GetAllProductUsersDTO } from "../dto/productUser.dto";
import { db } from "../utils/db.server";
import { GetAllResponse } from "../utils/types";
import { CreateProductUserValidation } from "../validation/productUser.validation";

class ProductCategoryService {
	static async getAllProductUsers(userId: number, queryParams: GetAllProductUsersDTO): Promise<GetAllResponse<ProductUser>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = {
			userId,
			product: { deletedAt: null },
			...(queryParams.productId ? { productId: parseInt(queryParams.productId), category: { deletedAt: null } } : {}),
		};
		const items = await db.productUser.findMany({
			where,
			orderBy: { product: { [queryParams.sortBy || "id"]: queryParams.sortType || "desc" } },
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
			include: {
				product: { include: { productOptions: { include: { variantValues: { include: { variantValue: { include: { variant: true } } } } } } } },
			},
		});

		const count = await db.productUser.count({ where });
		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}

	static async createProductUser(userId: number, input: CreateProductUserDTO): Promise<ProductUser> {
		assert(input, CreateProductUserValidation);
		return db.productUser.create({
			data: {
				userId,
				productId: input.productId,
			},
		});
	}

	static async deleteProductUser(userId: number, productId: number): Promise<ProductUser> {
		return db.productUser.delete({
			where: {
				productId_userId: {
					productId,
					userId,
				},
			},
		});
	}
}

export default ProductCategoryService;
