import { QueryParams } from "interfaces/common";
import { Product } from "interfaces/product";
import { ExtraPayloadType } from "./common";
import { User } from "./user";
export interface Vote {
	key?: string | number | React.Key;
	id?: number;
	createdAt?: string;
	updatedAt?: string;
	productId: number;
	userId: number;
	product?: Product;
	user?: User;
	rate: number;
	content: string;
}
export interface VotePayload extends ExtraPayloadType {
	body: Vote;
}
export interface GetVoteQueryParams extends QueryParams {
	productId: number;
}
export interface GetVotePayload extends ExtraPayloadType {
	params?: GetVoteQueryParams;
}
export interface DeleteManyVotePayload extends ExtraPayloadType {
	listId: React.Key[] | number[];
}
