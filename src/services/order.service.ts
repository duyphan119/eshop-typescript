import { Coupon, Order, OrderItem, OrderStatus, PaymentMethod, User } from "@prisma/client";
import { assert } from "superstruct";
import { CreateOrderDTO, GetAllOrdersDTO, UpdateOrderDTO } from "../dto/order.dto";
import { db } from "../utils/db.server";
import { BatchPayload, GetAllResponse } from "../utils/types";
import { CreateOrderValidation, UpdateOrderValidation } from "../validation/order.validation";
import OrderStatusService from "./orderStatus.service";

class OrderService {
	static async getAllOrders(queryParams: GetAllOrdersDTO): Promise<GetAllResponse<Order>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = {
			deletedAt: null,
			...(queryParams.city ? { city: { contains: queryParams.city, mode: "insensitive" } } : {}),
			...(queryParams.district ? { district: { contains: queryParams.district, mode: "insensitive" } } : {}),
			...(queryParams.ward ? { ward: { contains: queryParams.ward, mode: "insensitive" } } : {}),
			...(queryParams.address ? { address: { contains: queryParams.address, mode: "insensitive" } } : {}),
			...(queryParams.phone ? { phone: { contains: queryParams.phone, mode: "insensitive" } } : {}),
			...(queryParams.fullName ? { fullName: { contains: queryParams.fullName, mode: "insensitive" } } : {}),
			...(queryParams.createdAt ? { createdAt: { gte: new Date(queryParams.createdAt || 1) } } : {}),
		};
		const items = await db.order.findMany({
			where,
			orderBy: {
				[queryParams.sortBy || "id"]: queryParams.sortType || "desc",
			},
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
			include: {
				orderItems: { include: { productOption: { include: { product: true } } } },
				user: true,
				orderStatus: true,
				paymentMethod: true,
				coupon: true,
			},
		});

		const count = await db.category.count({ where });

		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}

	static async getAllOrdersOfUser(userId: number, queryParams: GetAllOrdersDTO): Promise<GetAllResponse<Order>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = {
			deletedAt: null,
			userId,
			...(queryParams.city ? { city: { contains: queryParams.city, mode: "insensitive" } } : {}),
			...(queryParams.district ? { district: { contains: queryParams.district, mode: "insensitive" } } : {}),
			...(queryParams.ward ? { ward: { contains: queryParams.ward, mode: "insensitive" } } : {}),
			...(queryParams.address ? { address: { contains: queryParams.address, mode: "insensitive" } } : {}),
			...(queryParams.phone ? { phone: { contains: queryParams.phone, mode: "insensitive" } } : {}),
			...(queryParams.fullName ? { fullName: { contains: queryParams.fullName, mode: "insensitive" } } : {}),
		};
		const items = await db.order.findMany({
			where,
			orderBy: {
				[queryParams.sortBy || "id"]: queryParams.sortType || "desc",
			},
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
			include: {
				orderItems: { include: { productOption: { include: { product: true } } } },
				user: true,
				orderStatus: true,
				paymentMethod: true,
				coupon: true,
			},
		});

		const count = await db.order.count({ where });

		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}

	static async getOrderById(id: number): Promise<Order | null> {
		return db.order.findFirst({
			where: { id, deletedAt: null },
			include: { orderItems: { include: { productOption: { include: { product: true } } } }, user: true },
		});
	}
	static async createOrder(userId: number, input: CreateOrderDTO): Promise<Order | null> {
		assert(input, CreateOrderValidation);
		const defaultOrderStatus = await OrderStatusService.getDefault();
		if (!defaultOrderStatus) return null;
		const { city, ward, district, description, address, phone, fullName, couponId, paymentMethodId, orderStatusId, shippingPrice, totalPrice } = input;
		return db.order.create({
			data: {
				city,
				ward,
				district,
				address,
				fullName,
				phone,
				description: description || "",
				couponId: couponId || null,
				paymentMethodId,
				orderStatusId: orderStatusId || defaultOrderStatus.id,
				userId: input.userId || userId,
				totalPrice,
				shippingPrice: shippingPrice || 0,
			},
		});
	}

	static async updateOrder(id: number, input: UpdateOrderDTO): Promise<Order> {
		assert(input, UpdateOrderValidation);
		const { orderStatusId } = input;
		return db.order.update({
			data: { ...(orderStatusId ? { orderStatusId } : {}) },
			where: { id },
		});
	}

	static async deleteOrder(id: number): Promise<Order> {
		return db.order.delete({ where: { id } });
	}

	static async deleteManyOrders({ ids }: { ids: number[] }): Promise<BatchPayload> {
		return db.order.deleteMany({ where: { id: { in: ids } } });
	}
}

export default OrderService;
