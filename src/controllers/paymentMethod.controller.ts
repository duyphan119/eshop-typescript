import { Request, Response } from "express";
import { CODE_RESPONSE, MESSAGE_RESPONSE, STATUS_CODE } from "../constants";
import PaymentMethodService from "../services/paymentMethod.service";
import { catchErrorResponse } from "../utils";
class PaymentMethodController {
	static async getAllPaymentMethods(req: Request, res: Response) {
		try {
			const data = await PaymentMethodService.getAllPaymentMethods(req.query);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getPaymentMethodById(req: Request, res: Response) {
		try {
			const data = await PaymentMethodService.getPaymentMethodById(parseInt(req.params.id));
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async createPaymentMethod(req: Request, res: Response) {
		try {
			const data = await PaymentMethodService.createPaymentMethod(req.body);
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async updatePaymentMethod(req: Request, res: Response) {
		try {
			const data = await PaymentMethodService.updatePaymentMethod(parseInt(req.params.id), req.body);
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteManyPaymentMethods(req: Request, res: Response) {
		try {
			await PaymentMethodService.deleteManyPaymentMethods(req.body);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deletePaymentMethod(req: Request, res: Response) {
		try {
			await PaymentMethodService.deletePaymentMethod(parseInt(req.params.id));
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default PaymentMethodController;
