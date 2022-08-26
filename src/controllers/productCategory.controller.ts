import { Request, Response } from "express";
import ProductCategoryService from "../services/productCategory.service";
import { CODE_RESPONSE, MESSAGE_RESPONSE, STATUS_CODE } from "../constants";
import { catchErrorResponse } from "../utils";
class ProductCategoryController {
	static async getAllProductCategories(req: Request, res: Response) {
		try {
			const data = await ProductCategoryService.getAllProductCategories(req.query);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}

	static async createProductCategory(req: Request, res: Response) {
		try {
			const data = await ProductCategoryService.createProductCategory(req.body);
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}

	static async createManyProductCategories(req: Request, res: Response) {
		try {
			await ProductCategoryService.createManyProductCategories(req.body);
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}

	static async deleteManyProductCategories(req: Request, res: Response) {
		try {
			await ProductCategoryService.deleteManyProductCategories(req.body);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default ProductCategoryController;
