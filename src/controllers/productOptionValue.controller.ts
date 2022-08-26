import { Request, Response } from "express";
import { CODE_RESPONSE, MESSAGE_RESPONSE, STATUS_CODE } from "../constants";
import ProductOptionValueService from "../services/productOptionValue.service";
import { catchErrorResponse } from "../utils";
class ProductOptionValueController {
	static async createManyProductOptionValues(req: Request, res: Response) {
		try {
			const data = await ProductOptionValueService.createManyProductOptionValues(req.body);
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default ProductOptionValueController;
