import { Request, Response } from "express";
import { CODE_RESPONSE, MESSAGE_RESPONSE, STATUS_CODE } from "../constants";
import UserService from "../services/user.service";
import { catchErrorResponse } from "../utils";

class UserController {
	static async getAllUsers(req: Request, res: Response) {
		try {
			const data = await UserService.getAllUsers(req.query);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getUserById(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async createUser(req: Request, res: Response) {
		try {
			const user = await UserService.createUser(req.body);
			const { hash, deletedAt, ...resUser } = user;
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data: resUser,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async updateUser(req: Request, res: Response) {
		try {
			const user = await UserService.updateUser(parseInt(req.params.id), req.body);
			const { hash, deletedAt, ...resUser } = user;
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data: resUser,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}

	static async deleteManyUsers(req: Request, res: Response) {
		try {
			await UserService.deleteManyUsers(req.body);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteUser(req: Request, res: Response) {
		try {
			await UserService.deleteUser(parseInt(req.params.id));
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default UserController;
