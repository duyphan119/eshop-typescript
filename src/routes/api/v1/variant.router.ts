import { Router } from "express";
import VariantController from "../../../controllers/variant.controller";
import { requireIsAdmin } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", VariantController.getVariantById);
router.get("/", VariantController.getAllVariants);
router.post("/", requireIsAdmin, VariantController.createVariant);
router.patch("/:id", requireIsAdmin, VariantController.updateVariant);
router.put("/:id", requireIsAdmin, VariantController.updateVariant);
router.delete("/many", requireIsAdmin, VariantController.deleteManyVariants);
router.delete("/:id", requireIsAdmin, VariantController.deleteVariant);

export default router;
