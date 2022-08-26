import { NavigatePayload, TokenPayload } from "./common";
import { User } from "./user";
export interface Login {
	email: string;
	password: string;
}

export interface Register extends Login {
	fullName: string;
	phone: string;
}

export interface LoginResponse {
	accessToken: string;
	user: User;
}

export interface LoginPayload extends NavigatePayload {
	body: Login;
}
export interface RegisterPayload extends NavigatePayload {
	body: Register;
}
export type EditProfile = {
	fullName?: string;
};
export type EditProfilePayload = {
	data: EditProfile;
} & TokenPayload;
