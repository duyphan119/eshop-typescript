import { Role } from "@prisma/client";
import { assert } from "superstruct";
import { CreateRoleDTO, CreateRoleValidation } from "../dto/role.dto";
import { db } from "../utils/db.server";

class RoleService {
	static async getDefault(): Promise<Role | null> {
		return db.role.findFirst({ where: { name: "CUSTOMER" } });
	}
	static async create(input: CreateRoleDTO): Promise<Role> {
		assert(input, CreateRoleValidation);
		return db.role.create({
			data: {
				name: input.name,
			},
		});
	}
}

export default RoleService;
