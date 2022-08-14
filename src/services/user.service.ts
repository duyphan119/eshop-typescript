import { BatchPayload } from "../utils/interfaces";
import { User, UserRole } from "@prisma/client";
import { hash } from "argon2";
import { assert } from "superstruct";
import { CreateUserDTO, GetAllUsersDTO, UpdateUserDTO } from "../dto/user.dto";
import { db } from "../utils/db.server";
import { GetAllResponse } from "../utils/types";
import { CreateUserValidation, UpdateUserValidation } from "../validation/user.validation";

class UserService {
	static async getAllUsers(queryParams: GetAllUsersDTO): Promise<GetAllResponse<User>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = {
			deletedAt: null,
			...(queryParams.email
				? {
						email: {
							contains: queryParams.email,
							mode: "insensitive",
						},
				  }
				: {}),
			...(queryParams.fullName
				? {
						fullName: {
							contains: queryParams.fullName,
							mode: "insensitive",
						},
				  }
				: {}),
			...(queryParams.phone
				? {
						phone: {
							contains: queryParams.phone,
							mode: "insensitive",
						},
				  }
				: {}),
		};
		const items = await db.user.findMany({
			where,
			orderBy: {
				[queryParams.sortBy || "id"]: queryParams.sortType || "desc",
			},
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
		});

		const count = await db.user.count({ where });

		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}
	static async getById(id: number): Promise<(User & { roles: UserRole[] }) | null> {
		return db.user.findUnique({
			where: { id },
			include: {
				roles: {
					include: {
						role: true,
					},
				},
			},
		});
	}
	static async createUser(input: CreateUserDTO): Promise<User> {
		assert(input, CreateUserValidation);
		return db.user.create({
			data: {
				email: input.email,
				phone: input.phone,
				hash: await hash(input.password),
				fullName: input.fullName,
				...(input.avatar ? { avatar: input.avatar } : {}),
			},
		});
	}
	static async deleteUser(id: number): Promise<User> {
		return db.user.delete({
			where: { id },
		});
	}
	static async deleteManyUsers({ ids }: { ids: number[] }): Promise<BatchPayload> {
		return db.user.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
	}
	static async updateUser(id: number, input: UpdateUserDTO): Promise<User> {
		assert(input, UpdateUserValidation);
		return db.user.update({
			where: {
				id,
			},
			data: {
				...(input.email ? { email: input.email } : {}),
				...(input.phone ? { phone: input.phone } : {}),
				...(input.fullName ? { fullName: input.fullName } : {}),
				...(input.avatar ? { avatar: input.avatar } : {}),
			},
		});
	}
}

export default UserService;
