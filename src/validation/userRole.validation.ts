import { number, object } from "superstruct";

export const CreateUserRoleValidation = object({
	roleId: number(),
	userId: number(),
});
