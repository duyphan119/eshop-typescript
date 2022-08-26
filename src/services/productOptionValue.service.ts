import { db } from "../utils/db.server";
import { BatchPayload } from "../utils/types";
import { assert } from "superstruct";
import { CreateProductOptionValueDTO } from "../dto/productOptionValue.dto";
import { CreateProductOptionValueValidation } from "../validation/productOptionValue.validation";

class ProductOptionValueService {
	static async createManyProductOptionValues(input: Array<CreateProductOptionValueDTO>): Promise<BatchPayload> {
		input.forEach((item: CreateProductOptionValueDTO) => {
			assert(item, CreateProductOptionValueValidation);
		});
		return db.productOptionValue.createMany({
			data: input,
		});
	}
}

export default ProductOptionValueService;
