import { Request, Response } from "express";
import ProductUserService from "../services/productUser.service";
import { CODE_RESPONSE, MESSAGE_RESPONSE, STATUS_CODE } from "../constants";
import { catchErrorResponse } from "../utils";
class ProductUserController {
	static async getAllProductUsers(req: Request, res: Response) {
		try {
			const { sub } = res.locals.jwtPayload;
			const data = await ProductUserService.getAllProductUsers(sub, req.query);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}

	static async createProductUser(req: Request, res: Response) {
		try {
			const { sub } = res.locals.jwtPayload;
			const data = await ProductUserService.createProductUser(sub, req.body);
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}

	static async deleteProductUser(req: Request, res: Response) {
		try {
			const { sub } = res.locals.jwtPayload;
			await ProductUserService.deleteProductUser(sub, parseInt(req.params.productId));
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default ProductUserController;
