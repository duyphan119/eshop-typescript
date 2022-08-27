import { Router } from "express";
import OrderController from "../../../controllers/order.controller";
import { requireIsAdmin, requireIsUser, requireLogin } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/mine", requireIsUser, OrderController.getAllOrdersOfUser);
router.get("/:id", requireIsAdmin, OrderController.getOrderById);
router.get("/", requireIsAdmin, OrderController.getAllOrders);
router.post("/", requireLogin, OrderController.createOrder);
router.patch("/:id", requireIsAdmin, OrderController.updateOrder);
router.put("/:id", requireIsAdmin, OrderController.updateOrder);
router.delete("/many", requireIsAdmin, OrderController.deleteManyOrders);
router.delete("/:id", requireIsAdmin, OrderController.deleteOrder);

export default router;
