import { Cart } from "./cart";
import { Post } from "./post";

export interface User {
	id?: number;
	createdAt?: Date;
	updatedAt?: Date;
	email: string;
	fullName: string;
	isAdmin?: boolean;
	posts?: Post[];
	cart?: Cart;
	cartId: number;
}
