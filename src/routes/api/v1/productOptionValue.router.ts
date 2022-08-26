import { Router } from "express";
import ProductOptionValueController from "../../../controllers/productOptionValue.controller";
import { requireLogin } from "../../../middlewares/auth.middleware";

const router = Router();

router.post("/many", requireLogin, ProductOptionValueController.createManyProductOptionValues);

export default router;
