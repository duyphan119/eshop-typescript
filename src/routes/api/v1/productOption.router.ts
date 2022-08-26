import { Router } from "express";
import ProductOptionController from "../../../controllers/productOption.controller";
import { requireIsAdmin } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", ProductOptionController.getProductOptionById);
router.get("/", ProductOptionController.getAllProductOptions);
router.post("/", requireIsAdmin, ProductOptionController.createProductOption);
router.patch("/:id", requireIsAdmin, ProductOptionController.updateProductOption);
router.put("/:id", requireIsAdmin, ProductOptionController.updateProductOption);
router.delete("/many", requireIsAdmin, ProductOptionController.deleteManyProductOptions);
router.delete("/:id", requireIsAdmin, ProductOptionController.deleteProductOption);

export default router;
