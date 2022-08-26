import { Request, Response } from "express";
import { CODE_RESPONSE, MESSAGE_RESPONSE, STATUS_CODE } from "../constants";
import CartItemService from "../services/cartItem.service";
import { catchErrorResponse } from "../utils";
class CategoryController {
	static async getAllCartItems(req: Request, res: Response) {
		try {
			const { sub } = res.locals.jwtPayload;
			const data = await CartItemService.getAllCartItems(sub, req.query);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async createCartItem(req: Request, res: Response) {
		try {
			const { sub } = res.locals.jwtPayload;
			const data = await CartItemService.createCartItem(sub, req.body);
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async updateCartItem(req: Request, res: Response) {
		try {
			const { sub } = res.locals.jwtPayload;
			const data = await CartItemService.updateCartItem(sub, parseInt(req.params.productOptionId), req.body);
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteManyCartItems(req: Request, res: Response) {
		try {
			const { sub } = res.locals.jwtPayload;
			await CartItemService.deleteManyCartItems(sub, req.body);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default CategoryController;
