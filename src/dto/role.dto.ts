import { object, size, string } from "superstruct";

export const CreateRoleValidation = object({
	name: size(string(), 1),
});

export type CreateRoleDTO = {
	name: string;
};
