import { Router } from "express";
import OrderItemController from "../../../controllers/orderItem.controller";
import { requireLogin } from "../../../middlewares/auth.middleware";

const router = Router();

router.post("/many", requireLogin, OrderItemController.createManyOrderItems);

export default router;
