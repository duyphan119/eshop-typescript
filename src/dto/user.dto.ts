import { QueryParams } from "../utils/types";

export type CreateUserDTO = {
	fullName: string;
	phone: string;
	password: string;
	email: string;
	avatar?: string;
};

export type UpdateUserDTO = {
	fullName?: string;
	phone?: string;
	email?: string;
	avatar?: string;
};

export type GetAllUsersDTO = QueryParams & {
	email?: string;
	fullName?: string;
	phone?: string;
};
