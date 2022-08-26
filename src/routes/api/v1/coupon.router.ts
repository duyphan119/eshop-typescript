import { Router } from "express";
import CouponController from "../../../controllers/coupon.controller";
import { requireIsAdmin } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", CouponController.getCouponById);
router.get("/", CouponController.getAllCoupons);
router.post("/", requireIsAdmin, CouponController.createCoupon);
router.patch("/:id", requireIsAdmin, CouponController.updateCoupon);
router.put("/:id", requireIsAdmin, CouponController.updateCoupon);
router.delete("/many", requireIsAdmin, CouponController.deleteManyCoupons);
router.delete("/:id", requireIsAdmin, CouponController.deleteCoupon);

export default router;
