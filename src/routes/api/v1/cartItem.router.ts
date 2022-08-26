import { Router } from "express";

import CartItemController from "../../../controllers/cartItem.controller";
import { requireIsUser } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/", requireIsUser, CartItemController.getAllCartItems);
router.post("/", requireIsUser, CartItemController.createCartItem);
router.patch("/:productOptionId", requireIsUser, CartItemController.updateCartItem);
router.put("/:productOptionId", requireIsUser, CartItemController.updateCartItem);
router.delete("/many", requireIsUser, CartItemController.deleteManyCartItems);

export default router;
