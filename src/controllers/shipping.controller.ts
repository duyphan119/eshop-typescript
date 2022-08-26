import { Request, Response } from "express";
import { CODE_RESPONSE, MESSAGE_RESPONSE, STATUS_CODE } from "../constants";
import ShippingService from "../services/shipping.service";
import { catchErrorResponse } from "../utils";
class ShippingController {
	static async getProvinces(req: Request, res: Response) {
		try {
			const data = await ShippingService.getProvinces();
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data: data.data.data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getDistricts(req: Request, res: Response) {
		try {
			const data = await ShippingService.getDistricts(req.query);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data: data.data.data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getWards(req: Request, res: Response) {
		try {
			const data = await ShippingService.getWards(req.query);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data: data.data.data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getServices(req: Request, res: Response) {
		try {
			const data = await ShippingService.getServices(req.query);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data: data.data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async calculateFee(req: Request, res: Response) {
		try {
			const data = await ShippingService.calculateFee(req.query);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data: data.data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default ShippingController;
