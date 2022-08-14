import { object, number } from "superstruct";

export const CreateUserRoleValidation = object({
	userId: number(),
	roleId: number(),
});

export type CreateUserRoleDTO = {
	userId: number;
	roleId: number;
};
