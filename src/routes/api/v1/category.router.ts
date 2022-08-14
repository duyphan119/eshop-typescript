import { Router } from "express";

import CategoryController from "../../../controllers/category.controller";
import { requireIsAdmin } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", CategoryController.getCategoryById);
router.get("/", CategoryController.getAllCategories);
router.post("/", requireIsAdmin, CategoryController.createCategory);
router.patch("/:id", requireIsAdmin, CategoryController.updateCategory);
router.put("/:id", requireIsAdmin, CategoryController.updateCategory);
router.delete("/many", requireIsAdmin, CategoryController.deleteManyCategories);
router.delete("/:id", requireIsAdmin, CategoryController.deleteCategory);

export default router;
