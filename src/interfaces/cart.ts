import { CartItem } from "./cartItem";
import { User } from "./user";

export interface Cart {
	id?: number;
	createdAt?: string;
	updatedAt?: string;
	userId: number;
	user?: User;
	cartItems?: CartItem[];
}
