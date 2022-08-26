import { ExtraPayloadType, QueryParams, TokenPayload } from "./common";
import { Product } from "./product";
import { User } from "./user";

export interface ProductUser {
	productId: number;
	userId: number;
	product?: Product;
	user?: User;
}
export interface ProductUserPayload extends ExtraPayloadType {
	body: { productId: number };
}
export interface RemoveWishlistItemPayload extends ExtraPayloadType {
	id: number;
}

export type CreateProductUser = {
	productId: number;
};

export type GetAllProductUsers = {
	params?: QueryParams;
} & TokenPayload;
