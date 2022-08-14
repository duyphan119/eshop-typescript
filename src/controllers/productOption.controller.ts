import { Request, Response } from "express";
import { catchErrorResponse } from "../utils";
class ProductOptionController {
	static async getAllProductOptions(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getProductOptionById(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async createProductOption(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async updateProductOption(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteProductOption(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default ProductOptionController;
