import { Router } from "express";
import PaymentMethodController from "../../../controllers/paymentMethod.controller";
import { requireIsAdmin } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", PaymentMethodController.getPaymentMethodById);
router.get("/", PaymentMethodController.getAllPaymentMethods);
router.post("/", requireIsAdmin, PaymentMethodController.createPaymentMethod);
router.patch("/:id", requireIsAdmin, PaymentMethodController.updatePaymentMethod);
router.put("/:id", requireIsAdmin, PaymentMethodController.updatePaymentMethod);
router.delete("/many", requireIsAdmin, PaymentMethodController.deleteManyPaymentMethods);
router.delete("/:id", requireIsAdmin, PaymentMethodController.deletePaymentMethod);

export default router;
