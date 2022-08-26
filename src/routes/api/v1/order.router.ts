import { Router } from "express";
import OrderController from "../../../controllers/order.controller";
import { requireIsAdmin, requireLogin } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/mine", requireLogin, OrderController.getAllOrdersOfUser);
router.get("/:id", requireLogin, OrderController.getAllOrders);
router.get("/", requireIsAdmin, OrderController.getAllOrders);
router.post("/", requireLogin, OrderController.createOrder);
router.patch("/:id", requireIsAdmin, OrderController.updateOrder);
router.put("/:id", requireIsAdmin, OrderController.updateOrder);
router.delete("/many", requireIsAdmin, OrderController.deleteManyOrders);
router.delete("/:id", requireIsAdmin, OrderController.deleteOrder);

export default router;
