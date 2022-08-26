import { Banner } from "./banner";
import { ExtraPayloadType } from "./common";
export interface Meta {
	key?: string | number | React.Key;
	id?: number;
	name: string;
	createdAt?: string;
	updatedAt?: string;
	description: string;
	banners?: Banner[];
}
export interface MetaPayload extends ExtraPayloadType {
	body: Meta;
}
export interface DeleteManyMediaPayload extends ExtraPayloadType {
	listId: React.Key[] | number[];
}
