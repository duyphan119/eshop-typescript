import { Request, Response } from "express";
import { CODE_RESPONSE, MESSAGE_RESPONSE, STATUS_CODE } from "../constants";
import BannerService from "../services/banner.service";
import { catchErrorResponse } from "../utils";
class BannerController {
	static async getAllBanners(req: Request, res: Response) {
		try {
			const data = await BannerService.getAllBanners(req.query);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getBannerById(req: Request, res: Response) {
		try {
			const data = await BannerService.getBannerById(parseInt(req.params.id));
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async createBanner(req: Request, res: Response) {
		try {
			const data = await BannerService.createBanner(req.body);
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async updateBanner(req: Request, res: Response) {
		try {
			const data = await BannerService.updateBanner(parseInt(req.params.id), req.body);
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteManyBanners(req: Request, res: Response) {
		try {
			await BannerService.deleteManyBanners(req.body);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteBanner(req: Request, res: Response) {
		try {
			await BannerService.deleteBanner(parseInt(req.params.id));
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default BannerController;
