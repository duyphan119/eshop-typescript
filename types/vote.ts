import { QueryParams } from "./common";
import { Product } from "./product";
import { User } from "./user";
export interface GetVoteQueryParams extends QueryParams {
	productid?: number;
}
export type Vote = {
	id?: number;
	createdAt?: Date;
	updatedAt?: Date;
	userId: number;
	user?: User;
	productId: number;
	product?: Product;
	rate: number;
	content: string;
};
export interface CreateVoteDto {
	content: string;
	rate: number;
	productId: number;
}
