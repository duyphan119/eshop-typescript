import { CartItem, ProductOption, Product, Cart } from "@prisma/client";
import { CreateCartItemDTO, UpdateCartItemDTO } from "../dto/cartItem.dto";
import { db } from "../utils/db.server";
import { assert } from "superstruct";
import { CreateCartItemValidation, UpdateCartItemValidation } from "../validation/cartItem.validation";
import { BatchPayload, GetAllResponse, QueryParams } from "../utils/types";

class CartItemService {
	static async getAllCartItems(
		userId: number,
		queryParams: QueryParams
	): Promise<GetAllResponse<CartItem & { cart: Cart; productOption: ProductOption & { product: Product } }>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = { cart: { userId } };
		const items = await db.cartItem.findMany({
			where,
			orderBy: {
				[queryParams.sortBy || "assignedAt"]: queryParams.sortType || "desc",
			},
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
			include: {
				productOption: {
					include: {
						product: true,
					},
				},
				cart: true,
			},
		});

		const count = items.reduce((prev: number, item: CartItem) => prev + item.quantity, 0);

		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}

	static async createCartItem(userId: number, input: CreateCartItemDTO): Promise<CartItem | null> {
		assert(input, CreateCartItemValidation);
		const { productOptionId, quantity } = input;
		const cart = await db.cart.findFirst({ where: { userId } });
		if (!cart) return null;

		return db.cartItem.upsert({
			where: {
				cartId_productOptionId: {
					cartId: cart.id,
					productOptionId,
				},
			},
			create: {
				productOptionId,
				quantity,
				cartId: cart.id,
			},
			update: {
				productOptionId,
				quantity: {
					increment: quantity,
				},
				cartId: cart.id,
			},
		});
	}

	static async updateCartItem(userId: number, productOptionId: number, input: UpdateCartItemDTO): Promise<CartItem | null> {
		assert(input, UpdateCartItemValidation);
		const { newQuantity } = input;
		const cart = await db.cart.findFirst({ where: { userId } });
		if (!cart) return null;
		return db.cartItem.update({
			data: { quantity: newQuantity },
			where: { cartId_productOptionId: { productOptionId, cartId: cart.id } },
		});
	}

	static async deleteManyCartItems(userId: number, { productOptionIds }: { productOptionIds: number[] }): Promise<BatchPayload> {
		const cart = await db.cart.findFirst({ where: { userId } });
		if (!cart) return { count: 0 };
		return db.cartItem.deleteMany({ where: { productOptionId: { in: productOptionIds }, cartId: cart.id } });
	}
}

export default CartItemService;
