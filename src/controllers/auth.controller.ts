import { Request, Response } from "express";
import { CODE_RESPONSE, COOKIE_REFRESH_TOKEN, MESSAGE_RESPONSE, STATUS_CODE, __prod__ } from "../constants";
import AuthService from "../services/auth.service";
import RoleService from "../services/role.service";
import UserService from "../services/user.service";
import UserRoleService from "../services/userRole.service";
import { catchErrorResponse } from "../utils";

class AuthController {
	static async login(req: Request, res: Response) {
		try {
			const user = await AuthService.login(req.body);
			if (!user) {
				return res.status(STATUS_CODE.BAD_REQUEST).json({
					code: CODE_RESPONSE.ERROR,
					message: MESSAGE_RESPONSE.ERROR,
				});
			}
			const payload = {
				sub: user.id,
				roles: user.roles,
			};
			const accessToken = AuthService.createAccessToken(payload);
			const refreshToken = AuthService.createRefreshToken(payload);
			res.cookie(COOKIE_REFRESH_TOKEN, refreshToken, {
				maxAge: AuthService.refreshTokenExpireIn,
				httpOnly: true,
				secure: __prod__,
				sameSite: "lax",
			});

			const { hash, deletedAt, ...resUser } = user;

			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data: { user: resUser, accessToken, refreshToken },
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async register(req: Request, res: Response) {
		try {
			const user = await AuthService.register(req.body);
			const role = await RoleService.findOne({ name: "CUSTOMER" });
			if (role) {
				await UserRoleService.create({
					userId: user.id,
					roleId: role.id,
				});
			}
			const payload = {
				sub: user.id,
				roles: [role],
			};
			const accessToken = AuthService.createAccessToken(payload);
			const refreshToken = AuthService.createRefreshToken(payload);
			res.cookie(COOKIE_REFRESH_TOKEN, refreshToken, {
				maxAge: AuthService.refreshTokenExpireIn,
				httpOnly: true,
				secure: __prod__,
				sameSite: "lax",
			});

			const { hash, deletedAt, ...resUser } = user;

			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data: { user: resUser, accessToken, refreshToken },
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async refreshToken(req: Request, res: Response) {
		try {
			const refreshToken = req.cookies[COOKIE_REFRESH_TOKEN] || req.body.refreshToken;
			if (!refreshToken) {
				return res.status(STATUS_CODE.UNAUTHORIZED).json({
					code: CODE_RESPONSE.ERROR,
					message: MESSAGE_RESPONSE.UNAUTHORIZED,
				});
			}
			const payload = AuthService.verifyRefreshToken(refreshToken);
			if (payload) {
				const accessToken = AuthService.createAccessToken(payload);
				const refreshToken = AuthService.createRefreshToken(payload);
				res.cookie(COOKIE_REFRESH_TOKEN, refreshToken, {
					maxAge: AuthService.refreshTokenExpireIn,
					httpOnly: true,
					secure: __prod__,
					sameSite: "lax",
				});
				return res.status(STATUS_CODE.SUCCESS).json({
					code: CODE_RESPONSE.SUCCESS,
					message: MESSAGE_RESPONSE.SUCCESS,
					data: { accessToken, refreshToken },
				});
			}
			return res.status(STATUS_CODE.UNAUTHORIZED).json({
				code: CODE_RESPONSE.ERROR,
				message: MESSAGE_RESPONSE.UNAUTHORIZED,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async logout(req: Request, res: Response) {
		try {
			res.clearCookie(COOKIE_REFRESH_TOKEN);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getProfile(req: Request, res: Response) {
		try {
			if (res.locals.jwtPayload) {
				const { sub } = res.locals.jwtPayload;
				const user = await UserService.getById(sub);

				if (user) {
					const { hash, deletedAt, ...profile } = user;
					return res.status(STATUS_CODE.SUCCESS).json({
						code: CODE_RESPONSE.SUCCESS,
						message: MESSAGE_RESPONSE.SUCCESS,
						data: profile,
					});
				}
			}

			return res.status(STATUS_CODE.UNAUTHORIZED).json({
				code: CODE_RESPONSE.ERROR,
				message: MESSAGE_RESPONSE.UNAUTHORIZED,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async changePassword(req: Request, res: Response) {
		try {
			if (res.locals.jwtPayload) {
				const { sub } = res.locals.jwtPayload;
				const status = await AuthService.changePassword(sub, req.body);
				if (status === STATUS_CODE.SUCCESS) {
					return res.status(STATUS_CODE.SUCCESS).json({
						code: CODE_RESPONSE.SUCCESS,
						message: MESSAGE_RESPONSE.SUCCESS,
					});
				} else if (status === STATUS_CODE.BAD_REQUEST) {
					return res.status(STATUS_CODE.SUCCESS).json({
						code: CODE_RESPONSE.ERROR,
						message: "Mật khẩu cũ không chính xác",
					});
				}
			}
			return res.status(STATUS_CODE.UNAUTHORIZED).json({
				code: CODE_RESPONSE.ERROR,
				message: MESSAGE_RESPONSE.UNAUTHORIZED,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default AuthController;
