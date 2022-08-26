import isEmail from "isemail";
import { object, optional, refine, size, string } from "superstruct";

export const RegisterValidation = object({
	email: refine(string(), "email", (v) => isEmail.validate(v)),
	password: size(string(), 6, 30),
	fullName: size(string(), 1, 50),
	phone: size(string(), 10),
});

export const LoginValidation = object({
	email: refine(string(), "email", (v) => isEmail.validate(v)),
	password: size(string(), 6, 30),
});

export const ChangePasswordValidation = object({
	oldPassword: size(string(), 6, 30),
	newPassword: size(string(), 6, 30),
});

export const EditProfileValidation = object({
	fullName: optional(size(string(), 1, 50)),
});
