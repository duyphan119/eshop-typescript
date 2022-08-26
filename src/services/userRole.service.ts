import { assert } from "superstruct";
import { CreateUserRoleDTO } from "../dto/userRole.dto";
import { db } from "../utils/db.server";
import { BatchPayload } from "../utils/types";
import { CreateUserRoleValidation } from "../validation/userRole.validation";

class UserRoleService {
	static async createManyUserRoles(input: Array<CreateUserRoleDTO>): Promise<BatchPayload> {
		input.forEach((inputItem: CreateUserRoleDTO) => {
			assert(inputItem, CreateUserRoleValidation);
		});
		return db.userRole.createMany({
			data: input,
		});
	}
}

export default UserRoleService;
