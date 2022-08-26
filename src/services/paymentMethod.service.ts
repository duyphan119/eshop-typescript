import { PaymentMethod } from "@prisma/client";
import { assert } from "superstruct";
import { CreatePaymentMethodDTO, GetAllPaymentMethodsDTO, UpdatePaymentMethodDTO } from "../dto/paymentMethod.dto";
import { db } from "../utils/db.server";
import { GetAllResponse, BatchPayload } from "../utils/types";
import { CreatePaymentMethodValidation, UpdatePaymentMethodValidation } from "../validation/paymentMethod.validation";

class PaymentMethodService {
	static async getAllPaymentMethods(queryParams: GetAllPaymentMethodsDTO): Promise<GetAllResponse<PaymentMethod>> {
		const limit = queryParams.limit ? parseInt(queryParams.limit) : 10;
		const p = queryParams.p ? (parseInt(queryParams.p) - 1) * limit : 0;
		const where: any = {
			deletedAt: null,
			...(queryParams.name ? { name: { contains: queryParams.name, mode: "insensitive" } } : {}),
		};
		const items = await db.paymentMethod.findMany({
			where,
			orderBy: {
				[queryParams.sortBy || "id"]: queryParams.sortType || "desc",
			},
			...(queryParams.limit ? { take: limit } : {}),
			...(queryParams.limit && queryParams.p ? { skip: p } : {}),
		});

		const count = await db.paymentMethod.count({ where });

		return {
			items,
			count,
			totalPage: queryParams.limit ? Math.ceil(count / limit) : 1,
		};
	}
	static async getPaymentMethodById(id: number): Promise<PaymentMethod | null> {
		return db.paymentMethod.findFirst({ where: { id, deletedAt: null } });
	}
	static async createPaymentMethod(input: CreatePaymentMethodDTO): Promise<PaymentMethod> {
		assert(input, CreatePaymentMethodValidation);
		const { name } = input;
		return db.paymentMethod.create({
			data: { name },
		});
	}

	static async updatePaymentMethod(id: number, input: UpdatePaymentMethodDTO): Promise<PaymentMethod> {
		assert(input, UpdatePaymentMethodValidation);
		const { name } = input;
		return db.paymentMethod.update({
			data: {
				...(name ? { name } : {}),
			},
			where: {
				id,
			},
		});
	}

	static async deletePaymentMethod(id: number): Promise<PaymentMethod> {
		return db.paymentMethod.delete({
			where: { id },
		});
	}

	static async deleteManyPaymentMethods({ ids }: { ids: number[] }): Promise<BatchPayload> {
		return db.paymentMethod.deleteMany({
			where: { id: { in: ids } },
		});
	}
}

export default PaymentMethodService;
