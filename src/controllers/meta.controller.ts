import { Request, Response } from "express";
import { catchErrorResponse } from "../utils";
class MetaController {
	static async getAllMeta(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getMetaById(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async createMeta(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async updateMeta(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteMeta(req: Request, res: Response) {
		try {
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default MetaController;
