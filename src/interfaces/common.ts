import { AppDispatch } from "redux/store";
import { NavigateFunction } from "react-router-dom";

export interface DispatchPayload {
	dispatch: AppDispatch;
}

export interface GetAllResponse<T> {
	items: T[];
	count: number;
	totalPage: number;
}

export interface ExtraPayloadType extends DispatchPayload {
	accessToken: string;

	formData?: FormData;

	file?: File;

	afterSuccess?: Function;
}

export type TokenPayload = {
	accessToken: string;
	dispatch: AppDispatch;
	onDone?: Function;
};

export interface GetExtraPayloadType extends ExtraPayloadType {
	params?: QueryParams;
}

export interface NavigatePayload {
	navigate?: NavigateFunction;
}

export interface QueryParams {
	limit?: number;
	p?: number;
	sortBy?: string;
	sortType?: "asc" | "desc";
}

export interface SearchParams extends QueryParams {
	q?: string;
}

export interface FetchState {
	isLoading: boolean;
	isError: boolean;
}
