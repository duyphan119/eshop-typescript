import { Router } from "express";
import OrderStatusController from "../../../controllers/orderStatus.controller";
import { requireIsAdmin } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", OrderStatusController.getOrderStatusById);
router.get("/", OrderStatusController.getAllOrderStatuses);
router.post("/", requireIsAdmin, OrderStatusController.createOrderStatus);
router.patch("/:id", requireIsAdmin, OrderStatusController.updateOrderStatus);
router.put("/:id", requireIsAdmin, OrderStatusController.updateOrderStatus);
router.delete("/many", requireIsAdmin, OrderStatusController.deleteManyOrderStatuses);
router.delete("/:id", requireIsAdmin, OrderStatusController.deleteOrderStatus);

export default router;
