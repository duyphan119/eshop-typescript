import { Router } from "express";
import ShippingController from "../../../controllers/shipping.controller";

const router = Router();

router.get("/province", ShippingController.getProvinces);
router.get("/district", ShippingController.getDistricts);
router.get("/ward", ShippingController.getWards);
router.get("/service", ShippingController.getServices);
router.get("/fee", ShippingController.calculateFee);

export default router;
