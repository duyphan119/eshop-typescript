import { ProductOption } from "@prisma/client";
import { assert } from "superstruct";
import { CreateProductOptionDTO, GetAllProductOptionsDTO, UpdateProductOptionDTO } from "../dto/productOption.dto";
import { db } from "../utils/db.server";
import { BatchPayload, GetAllResponse } from "../utils/types";
import { UpdateProductValidation } from "../validation/product.validation";
import { CreateProductOptionValidation } from "../validation/productOption.validation";

class ProductOptionService {
	static async getAllProductOptions(queryParams: GetAllProductOptionsDTO): Promise<GetAllResponse<ProductOption>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = {
			deletedAt: null,
			...(queryParams.productId ? { productId: { contains: queryParams.productId, mode: "insensitive" } } : {}),
			...(queryParams.amount ? { amount: parseInt(queryParams.amount) } : {}),
			...(queryParams.title ? { title: { contains: queryParams.title, mode: "insensitive" } } : {}),
		};
		const items = await db.productOption.findMany({
			where,
			orderBy: {
				[queryParams.sortBy || "id"]: queryParams.sortType || "desc",
			},
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
			include: { variantValues: { include: { variantValue: { include: { variant: true } } } }, product: true },
		});

		const count = await db.product.count({ where });

		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}

	static async getProductOptionById(id: number): Promise<ProductOption | null> {
		return db.productOption.findUnique({
			where: { id },
			include: { variantValues: { include: { variantValue: { include: { variant: true } } } }, product: true },
		});
	}

	static async createProductOption(input: CreateProductOptionDTO): Promise<ProductOption> {
		assert(input, CreateProductOptionValidation);
		const { thumbnail, title, amount, weight, sku, productId } = input;
		return db.productOption.create({
			data: { thumbnail, title, amount, weight, sku, productId },
		});
	}

	static async updateProductOption(id: number, input: UpdateProductOptionDTO): Promise<ProductOption> {
		assert(input, UpdateProductValidation);
		const { thumbnail, title, amount, weight, sku, productId } = input;
		return db.productOption.update({
			data: {
				...(title ? { title } : {}),
				...(amount ? { amount } : {}),
				...(weight ? { weight } : {}),
				...(thumbnail ? { thumbnail } : {}),
				...(sku ? { sku } : {}),
				...(productId ? { productId } : {}),
			},
			where: { id },
		});
	}

	static async deleteProductOption(id: number): Promise<ProductOption> {
		return db.productOption.delete({ where: { id } });
	}

	static async deleteManyProductOptions({ ids }: { ids: number[] }): Promise<BatchPayload> {
		return db.productOption.deleteMany({ where: { id: { in: ids } } });
	}

	static async updateQuantity(operation: "decrement" | "increment", input: { productOptionId: number; quantity: number }): Promise<ProductOption> {
		return db.productOption.update({
			where: {
				id: input.productOptionId,
			},
			data: {
				amount: {
					[operation]: input.quantity,
				},
			},
		});
	}
}

export default ProductOptionService;
