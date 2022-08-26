import { Request, Response } from "express";
import { CODE_RESPONSE, MESSAGE_RESPONSE, STATUS_CODE } from "../constants";
import CategoryTypeService from "../services/categoryType.service";
import { catchErrorResponse } from "../utils";
class CategoryTypeController {
	static async getAllCategoryTypes(req: Request, res: Response) {
		try {
			const data = await CategoryTypeService.getAllCategoryTypes(req.query);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getCategoryTypeById(req: Request, res: Response) {
		try {
			const data = await CategoryTypeService.getCategoryTypeById(parseInt(req.params.id));
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async createCategoryType(req: Request, res: Response) {
		try {
			const data = await CategoryTypeService.createCategoryType(req.body);
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async updateCategoryType(req: Request, res: Response) {
		try {
			const data = await CategoryTypeService.updateCategoryType(parseInt(req.params.id), req.body);
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteManyCategoryTypes(req: Request, res: Response) {
		try {
			await CategoryTypeService.deleteManyCategoryTypes(req.body);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteCategoryType(req: Request, res: Response) {
		try {
			await CategoryTypeService.deleteCategoryType(parseInt(req.params.id));
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default CategoryTypeController;
