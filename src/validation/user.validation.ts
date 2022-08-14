import isEmail from "isemail";
import { object, optional, refine, size, string } from "superstruct";

export const CreateUserValidation = object({
	email: refine(string(), "email", (v) => isEmail.validate(v)),
	password: optional(size(string(), 6, 30)),
	fullName: size(string(), 1, 50),
	phone: size(string(), 10),
	avatar: optional(string()),
});

export const UpdateUserValidation = object({
	email: optional(refine(string(), "email", (v) => isEmail.validate(v))),
	fullName: optional(size(string(), 1, 50)),
	phone: optional(size(string(), 10)),
	avatar: optional(string()),
});
