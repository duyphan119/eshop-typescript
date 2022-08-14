import { Request, Response } from "express";
import { CODE_RESPONSE, MESSAGE_RESPONSE, STATUS_CODE } from "../constants";
import ProductService from "../services/product.service";
import { catchErrorResponse } from "../utils";
class ProductController {
	static async getAllProducts(req: Request, res: Response) {
		try {
			const data = await ProductService.getAllProducts(req.query);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getProductById(req: Request, res: Response) {
		try {
			const data = await ProductService.getProductById(parseInt(req.params.id));
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async createProduct(req: Request, res: Response) {
		try {
			const data = await ProductService.createProduct(req.body);
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async updateProduct(req: Request, res: Response) {
		try {
			const data = await ProductService.updateProduct(parseInt(req.params.id), req.body);
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteManyProducts(req: Request, res: Response) {
		try {
			await ProductService.deleteManyProducts(req.body);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteProduct(req: Request, res: Response) {
		try {
			await ProductService.deleteProduct(parseInt(req.params.id));
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default ProductController;
