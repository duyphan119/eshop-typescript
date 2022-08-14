import { Request, Response } from "express";
import { catchErrorResponse } from "../utils";
class VariantValueController {
	static async getAllVariantValues(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getVariantValueById(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async createVariantValue(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async updateVariantValue(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteVariantValue(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default VariantValueController;
