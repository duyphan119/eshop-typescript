import { Cart } from "./cart";
import { QueryParams } from "./common";
import { ProductOption } from "./productOption";
export interface GetCartItemQueryParams extends QueryParams {}
export type CartItem = {
	id?: number;
	createdAt?: Date;
	updatedAt?: Date;
	cartId: number;
	cart?: Cart;
	productOptionId: number;
	productOption?: ProductOption;
	quantity: number;
};
