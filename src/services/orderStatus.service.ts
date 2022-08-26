import { OrderStatus } from "@prisma/client";
import { assert } from "superstruct";
import { CreateOrderStatusDTO, GetAllOrderStatusesDTO, UpdateOrderStatusDTO } from "../dto/orderStatus.dto";
import { db } from "../utils/db.server";
import { GetAllResponse, BatchPayload } from "../utils/types";
import { CreateOrderStatusValidation, UpdateOrderStatusValidation } from "../validation/orderStatus.validation";

class OrderStatusService {
	static async getDefault(): Promise<OrderStatus | null> {
		return db.orderStatus.findFirst({ where: { type: "Pending", deletedAt: null } });
	}
	static async getAllOrderStatuses(queryParams: GetAllOrderStatusesDTO): Promise<GetAllResponse<OrderStatus>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = {
			deletedAt: null,
			...(queryParams.name ? { name: { contains: queryParams.name, mode: "insensitive" } } : {}),
			...(queryParams.type ? { type: { contains: queryParams.type, mode: "insensitive" } } : {}),
		};
		const items = await db.orderStatus.findMany({
			where,
			orderBy: {
				[queryParams.sortBy || "id"]: queryParams.sortType || "desc",
			},
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
		});

		const count = await db.orderStatus.count({ where });

		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}
	static async getOrderStatusById(id: number): Promise<OrderStatus | null> {
		return db.orderStatus.findFirst({ where: { id, deletedAt: null } });
	}
	static async createOrderStatus(input: CreateOrderStatusDTO): Promise<OrderStatus> {
		assert(input, CreateOrderStatusValidation);
		const { name, type } = input;
		return db.orderStatus.create({
			data: { name, type },
		});
	}

	static async updateOrderStatus(id: number, input: UpdateOrderStatusDTO): Promise<OrderStatus> {
		assert(input, UpdateOrderStatusValidation);
		const { name } = input;
		return db.orderStatus.update({
			data: {
				...(name ? { name } : {}),
			},
			where: { id },
		});
	}

	static async deleteOrderStatus(id: number): Promise<OrderStatus> {
		return db.orderStatus.delete({ where: { id } });
	}

	static async deleteManyOrderStatuses({ ids }: { ids: number[] }): Promise<BatchPayload> {
		return db.orderStatus.deleteMany({ where: { id: { in: ids } } });
	}
}

export default OrderStatusService;
