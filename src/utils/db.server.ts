import { PrismaClient } from "@prisma/client";
let db: PrismaClient;
const prisma = new PrismaClient({});
function setUpModel(modelName: string) {
	prisma.$use(async (params, next) => {
		if (params.model == modelName) {
			if (params.action == "delete") {
				// Delete queries
				// Change action to an update
				params.action = "update";
				params.args["data"] = { deletedAt: new Date() };
			}
			if (params.action == "deleteMany") {
				// Delete many queries
				params.action = "updateMany";
				if (params.args.data != undefined) {
					params.args.data["deletedAt"] = new Date();
				} else {
					params.args["data"] = { deletedAt: new Date() };
				}
			}
		}
		return next(params);
	});
}

async function main() {
	/***********************************/
	/* SOFT DELETE MIDDLEWARE */
	/***********************************/
	setUpModel("Role");
	setUpModel("User");
	setUpModel("CategoryType");
	setUpModel("Category");
	setUpModel("Product");
	setUpModel("Variant");
	setUpModel("VariantValue");
	setUpModel("ProductOption");
	setUpModel("Cart");
	setUpModel("OrderStatus");
	setUpModel("Order");
	setUpModel("PaymentMethod");
	setUpModel("Meta");
	setUpModel("Coupon");
	setUpModel("Vote");
	setUpModel("RepVote");
	setUpModel("Post");
	setUpModel("Comment");
	setUpModel("RepComment");
}

declare global {
	var __db: PrismaClient | undefined;
}

if (!global.__db) {
	main();
	global.__db = prisma;
}

db = global.__db;

export { db };
