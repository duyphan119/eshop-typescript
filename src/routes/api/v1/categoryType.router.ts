import { Router } from "express";
import CategoryTypeController from "../../../controllers/categoryType.controller";
import { requireIsAdmin } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", CategoryTypeController.getCategoryTypeById);
router.get("/", CategoryTypeController.getAllCategoryTypes);
router.post("/", requireIsAdmin, CategoryTypeController.createCategoryType);
router.patch("/:id", requireIsAdmin, CategoryTypeController.updateCategoryType);
router.put("/:id", requireIsAdmin, CategoryTypeController.updateCategoryType);
router.delete("/many", requireIsAdmin, CategoryTypeController.deleteManyCategoryTypes);
router.delete("/:id", requireIsAdmin, CategoryTypeController.deleteCategoryType);

export default router;
