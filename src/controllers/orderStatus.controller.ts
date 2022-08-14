import { Request, Response } from "express";
import { catchErrorResponse } from "../utils";
class OrderStatusController {
	static async getAllOrderStatuses(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getOrderStatusById(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async createOrderStatus(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async updateOrderStatus(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteOrderStatus(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default OrderStatusController;
