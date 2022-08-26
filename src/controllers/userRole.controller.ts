import { Request, Response } from "express";
import { CODE_RESPONSE, MESSAGE_RESPONSE, STATUS_CODE } from "../constants";
import UserRoleService from "../services/userRole.service";
import { catchErrorResponse } from "../utils";
class UserRoleController {
	static async createManyUserRoles(req: Request, res: Response) {
		try {
			const data = await UserRoleService.createManyUserRoles(req.body);
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default UserRoleController;
