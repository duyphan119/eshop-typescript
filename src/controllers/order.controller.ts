import { Request, Response } from "express";
import { catchErrorResponse } from "../utils";
class OrderController {
	static async getAllOrders(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getOrderById(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async createOrder(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async updateOrder(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteOrder(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default OrderController;
