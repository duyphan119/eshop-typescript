import { Request, Response } from "express";
import { CODE_RESPONSE, MESSAGE_RESPONSE, STATUS_CODE } from "../constants";
import ProductOptionService from "../services/productOption.service";
import { catchErrorResponse } from "../utils";
class ProductOptionController {
	static async getAllProductOptions(req: Request, res: Response) {
		try {
			const data = await ProductOptionService.getAllProductOptions(req.query);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getProductOptionById(req: Request, res: Response) {
		try {
			const data = await ProductOptionService.getProductOptionById(parseInt(req.params.id));
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async createProductOption(req: Request, res: Response) {
		try {
			const data = await ProductOptionService.createProductOption(req.body);
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async updateProductOption(req: Request, res: Response) {
		try {
			const data = await ProductOptionService.updateProductOption(parseInt(req.params.id), req.body);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteProductOption(req: Request, res: Response) {
		try {
			await ProductOptionService.deleteProductOption(parseInt(req.params.id));
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteManyProductOptions(req: Request, res: Response) {
		try {
			await ProductOptionService.deleteManyProductOptions(req.body);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default ProductOptionController;
