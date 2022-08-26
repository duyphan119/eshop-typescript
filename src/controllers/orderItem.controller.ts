import { Request, Response } from "express";
import { CODE_RESPONSE, MESSAGE_RESPONSE, STATUS_CODE } from "../constants";
import OrderItemService from "../services/orderItem.service";
import { catchErrorResponse } from "../utils";
class OrderItemController {
	static async createManyOrderItems(req: Request, res: Response) {
		try {
			const data = await OrderItemService.createManyOrderItems(req.body);
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

export default OrderItemController;
