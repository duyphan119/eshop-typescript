import { CreateOrderItemDTO } from "../dto/orderItem.dto";
import { db } from "../utils/db.server";
import { assert } from "superstruct";
import { CreateOrderItemValidation } from "../validation/orderItem.validation";
import { BatchPayload } from "../utils/types";

class OrderItemService {
	static async createManyOrderItems(input: Array<CreateOrderItemDTO>): Promise<BatchPayload> {
		assert(input, CreateOrderItemValidation);
		return db.orderItem.createMany({ data: input });
	}
}

export default OrderItemService;
