import { User, UserRole } from "@prisma/client";
import { assert } from "superstruct";
import { RegisterDTO, ChangePasswordDTO } from "../dto/auth.dto";
import { RegisterValidation, LoginValidation } from "../validation/auth.validation";
import { db } from "../utils/db.server";
import { hash, verify } from "argon2";
import { sign, verify as verifyToken } from "jsonwebtoken";
import { STATUS_CODE } from "../constants";

class AuthService {
	public static accessTokenExpireIn = 24 * 60 * 60 * 1000;
	public static refreshTokenExpireIn = 365 * 24 * 60 * 60 * 1000;
	public static accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET";
	public static refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET";

	static createAccessToken(payload: any): string {
		return sign(payload, this.accessTokenSecret, {
			expiresIn: this.accessTokenExpireIn,
		});
	}

	static verifyAccessToken(accessToken: string) {
		return verifyToken(accessToken, this.accessTokenSecret);
	}

	static verifyRefreshToken(refreshToken: string) {
		return verifyToken(refreshToken, this.refreshTokenSecret);
	}

	static createRefreshToken(payload: any): string {
		return sign(payload, this.refreshTokenSecret, {
			expiresIn: this.refreshTokenExpireIn,
		});
	}

	static async register(input: RegisterDTO): Promise<User> {
		assert(input, RegisterValidation);

		const hashedPassword = await hash(input.password);
		return db.user.create({
			data: {
				email: input.email,
				fullName: input.fullName,
				phone: input.phone,
				hash: hashedPassword,
			},
		});
	}

	static async login(input: RegisterDTO): Promise<(User & { roles: UserRole[] }) | null> {
		assert(input, LoginValidation);

		const user = await db.user.findUnique({
			where: {
				email: input.email,
			},
			include: {
				roles: {
					include: {
						role: true,
					},
				},
			},
		});

		if (!user) return null;

		const compared = await verify(user.hash, input.password);

		if (!compared) return null;

		return user;
	}

	static async changePassword(userId: number, input: ChangePasswordDTO): Promise<number> {
		const user = await db.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			return STATUS_CODE.UNAUTHORIZED;
		}

		const comparedOldPassword = await verify(user.hash, input.oldPassword);

		if (!comparedOldPassword) {
			return STATUS_CODE.BAD_REQUEST;
		}

		const hashedNewPassword = await hash(input.newPassword);

		await db.user.update({
			where: {
				id: user.id,
			},
			data: {
				hash: hashedNewPassword,
			},
		});

		return STATUS_CODE.SUCCESS;
	}
}
export default AuthService;
