export type RegisterDTO = {
	email: string;
	password: string;
	fullName: string;
	phone: string;
};

export type LoginDTO = {
	email: string;
	password: string;
};

export type ChangePasswordDTO = {
	oldPassword: string;
	newPassword: string;
};
