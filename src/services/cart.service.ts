import { Cart } from "@prisma/client";
import { db } from "../utils/db.server";

class CartService {
	static async createCart(input: { userId: number }): Promise<Cart> {
		return db.cart.create({ data: { userId: input.userId } });
	}
}

export default CartService;
