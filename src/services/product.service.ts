import { Product } from "@prisma/client";
import { assert } from "superstruct";
import { CreateProductDTO, GetAllProductsDTO, UpdateProductDTO } from "../dto/product.dto";
import { db } from "../utils/db.server";
import { GetAllResponse, BatchPayload } from "../utils/types";
import { CreateProductValidation, UpdateProductValidation } from "../validation/product.validation";

class ProductService {
	static async getAllProducts(queryParams: GetAllProductsDTO): Promise<GetAllResponse<Product>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = {
			deletedAt: null,
			...(queryParams.name ? { name: { contains: queryParams.name, mode: "insensitive" } } : {}),
			...(queryParams.slug ? { slug: { contains: queryParams.slug, mode: "insensitive" } } : {}),
			...(queryParams.price ? { price: parseInt(queryParams.price) } : {}),
		};
		const items = await db.product.findMany({
			where,
			orderBy: {
				[queryParams.sortBy || "id"]: queryParams.sortType || "desc",
			},
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
			include: {
				users: { include: { user: true } },
				categories: { include: { category: true } },
				productOptions: { include: { variantValues: { include: { variantValue: { include: { variant: true } } } } } },
			},
		});

		const count = await db.product.count({ where });

		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}
	static async getProductById(id: number): Promise<Product | null> {
		return db.product.findFirst({
			include: {
				users: {
					include: {
						user: true,
					},
				},
				categories: {
					include: {
						category: true,
					},
				},
				productOptions: {
					include: {
						variantValues: {
							include: {
								variantValue: {
									include: {
										variant: true,
									},
								},
							},
						},
					},
				},
			},
		});
	}
	static async createProduct(input: CreateProductDTO): Promise<Product> {
		assert(input, CreateProductValidation);
		const { name, slug, description, thumbnail, price, newPrice } = input;
		return db.product.create({
			data: {
				name,
				slug,
				description: description || "",
				thumbnail: thumbnail || "",
				price,
				newPrice: newPrice || 0,
			},
		});
	}

	static async updateProduct(id: number, input: UpdateProductDTO): Promise<Product> {
		assert(input, UpdateProductValidation);
		const { name, slug, description, thumbnail, price, newPrice } = input;
		return db.product.update({
			data: {
				...(name ? { name } : {}),
				...(slug ? { slug } : {}),
				...(description ? { description } : {}),
				...(thumbnail ? { thumbnail } : {}),
				...(price ? { price } : {}),
				...(newPrice ? { newPrice } : {}),
			},
			where: {
				id,
			},
		});
	}

	static async deleteProduct(id: number): Promise<Product> {
		return db.product.delete({
			where: { id },
		});
	}

	static async deleteManyProducts({ ids }: { ids: number[] }): Promise<BatchPayload> {
		return db.product.deleteMany({
			where: { id: { in: ids } },
		});
	}
}

export default ProductService;
