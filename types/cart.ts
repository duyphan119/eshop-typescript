import { User } from "./user";

export type Cart = {
	id?: number;
	createdAt?: Date;
	updatedAt?: Date;
	userId: number;
	user?: User;
};
