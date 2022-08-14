export interface BatchPayload {
	count: number;
}

export interface ResponseBatchPayload {
	status: number;
	data: BatchPayload;
}

export type ResponseData = {
	status: 200 | 201 | 400 | 401 | 403 | 500;
	data: any;
};

export interface ResponseErrorType {
	status: number;
	data: { message: string; code: 1 | 2 };
}

export interface ResponseType<T> {
	status: number;
	data: T | null;
}

export interface ResponseItemsType<T> {
	items: T[];
	totalResult?: number;
	totalPage?: number;
	limit?: number;
}

export interface ResponseItems<T> {
	status: number;
	data: T;
}

export interface QueryItems {
	limit?: string;
	p?: string;
	all?: string;
	depth?: string;
	sortBy?: string;
	sortType?: string;
	q?: string;
}

export interface IGetUserAuthInfoRequest extends Request {
	user: any;
}
