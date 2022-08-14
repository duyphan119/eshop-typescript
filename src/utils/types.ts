export type QueryParams = {
	p?: string;
	limit?: string;
	sortBy?: string;
	sortType?: string;
};

export type GetAllResponse<T> = {
	items: Array<T>;
	count: number;
	totalPage: number;
};
