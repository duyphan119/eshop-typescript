import { User } from "./user";

export interface Post {
	id?: number;
	createdAt?: Date;
	updatedAt?: Date;
	title: string;
	content: string;
	thumbnail: string;
	userId: number;
	user?: User;
}
