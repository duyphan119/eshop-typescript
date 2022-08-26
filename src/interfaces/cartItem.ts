import { Cart } from "./cart";
import { TokenPayload } from "./common";
import { ProductOption } from "./productOption";

export interface CartItem {
	id?: number;
	createdAt?: string;
	updatedAt?: string;
	cartId: number;
	cart?: Cart;
	productOptionId: number;
	productOption?: ProductOption;
	quantity: number;
}

export type CreateCartItem = {
	productOptionId: number;
	quantity: number;
};
export type UpdateCartItem = CreateCartItem;

export type CreateCartItemPayload = {
	data: CreateCartItem;
} & TokenPayload;

export type DeleteManyCartItems = {
	productOptionIds: Array<number>;
};

export type UpdateCartItemPayload = {
	data: UpdateCartItem;
} & TokenPayload;

export type RemoveCartItemPayload = {
	productOptionId: number;
} & TokenPayload;

export type DeleteManyCartItemsPayload = {
	data: DeleteManyCartItems;
} & TokenPayload;
