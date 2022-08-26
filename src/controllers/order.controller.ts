import { Request, Response } from "express";
import CartItemService from "../services/cartItem.service";
import { CODE_RESPONSE, MESSAGE_RESPONSE, STATUS_CODE } from "../constants";
import OrderService from "../services/order.service";
import { catchErrorResponse } from "../utils";
import OrderItemService from "../services/orderItem.service";
import { Cart, CartItem, Product, ProductOption } from "@prisma/client";
import ProductOptionService from "../services/productOption.service";
class OrderController {
	static async getAllOrders(req: Request, res: Response) {
		try {
			const data = await OrderService.getAllOrders(req.query);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getAllOrdersOfUser(req: Request, res: Response) {
		try {
			const { sub } = res.locals.jwtPayload;
			const data = await OrderService.getAllOrdersOfUser(sub, req.query);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async getOrderById(req: Request, res: Response) {
		try {
			const { sub, roles } = res.locals.jwtPayload;
			const data = await OrderService.getOrderById(parseInt(req.params.id));
			if (
				data?.userId !== sub &&
				roles.findIndex((item: any) => {
					if (item.role?.name === "CUSTOMER") {
						return true;
					}
					return false;
				}) !== -1
			)
				return res.status(STATUS_CODE.UNAUTHORIZED).json({
					code: CODE_RESPONSE.ERROR,
					message: MESSAGE_RESPONSE.UNAUTHORIZED,
				});
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async createOrder(req: Request, res: Response) {
		try {
			const { sub } = res.locals.jwtPayload;
			const data = await OrderService.createOrder(sub, req.body);
			if (data) {
				const cartItems = await CartItemService.getAllCartItems(sub, {});
				await OrderItemService.createManyOrderItems(
					cartItems.items.map((item: CartItem & { cart: Cart; productOption: ProductOption & { product: Product } }) => ({
						orderId: data.id,
						productOptionId: item.productOptionId,
						quantity: item.quantity,
						price: item.productOption.product.newPrice || item.productOption.product.price,
					}))
				);
				await Promise.allSettled(
					cartItems.items.map((item: CartItem) =>
						ProductOptionService.updateQuantity("decrement", { productOptionId: item.productOptionId, quantity: item.quantity })
					)
				);
				await CartItemService.deleteManyCartItems(sub, {
					productOptionIds: cartItems.items.map(
						(item: CartItem & { cart: Cart; productOption: ProductOption & { product: Product } }) => item.productOptionId
					),
				});
			}
			return res.status(STATUS_CODE.CREATED).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async updateOrder(req: Request, res: Response) {
		try {
			const data = await OrderService.updateOrder(parseInt(req.params.id), req.body);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
				data,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteOrder(req: Request, res: Response) {
		try {
			await OrderService.deleteOrder(parseInt(req.params.id));
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
	static async deleteManyOrders(req: Request, res: Response) {
		try {
			await OrderService.deleteManyOrders(req.body);
			return res.status(STATUS_CODE.SUCCESS).json({
				code: CODE_RESPONSE.SUCCESS,
				message: MESSAGE_RESPONSE.SUCCESS,
			});
		} catch (error) {
			return catchErrorResponse(res, error);
		}
	}
}

export default OrderController;
