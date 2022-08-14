import { Role } from "@prisma/client";
import { assert } from "superstruct";
import { CreateRoleDTO, CreateRoleValidation } from "../dto/role.dto";
import { db } from "../utils/db.server";

class RoleService {
	static async create(input: CreateRoleDTO): Promise<Role> {
		assert(input, CreateRoleValidation);
		return db.role.create({
			data: {
				name: input.name,
			},
		});
	}
	static async findOne(where: any) {
		return db.role.findFirst({
			where,
		});
	}
}

export default RoleService;
