import { UserRole } from "@prisma/client";
import { assert } from "superstruct";
import {
	CreateUserRoleValidation,
	CreateUserRoleDTO,
} from "../dto/userRole.dto";
import { db } from "../utils/db.server";

class UserRoleService {
	static async create(input: CreateUserRoleDTO): Promise<UserRole> {
		assert(input, CreateUserRoleValidation);
		return db.userRole.create({
			data: {
				userId: input.userId,
				roleId: input.roleId,
			},
		});
	}
}

export default UserRoleService;
