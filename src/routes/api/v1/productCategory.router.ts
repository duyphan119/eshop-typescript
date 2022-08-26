import { Router } from "express";
import ProductCategoryController from "../../../controllers/productCategory.controller";
import { requireIsAdmin } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/", ProductCategoryController.getAllProductCategories);
router.post("/many", requireIsAdmin, ProductCategoryController.createManyProductCategories);
router.post("/", requireIsAdmin, ProductCategoryController.createProductCategory);
router.delete("/many", requireIsAdmin, ProductCategoryController.deleteManyProductCategories);

export default router;
