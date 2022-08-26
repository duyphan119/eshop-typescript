import { Router } from "express";
import VariantValueController from "../../../controllers/variantValue.controller";
import { requireIsAdmin } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", VariantValueController.getVariantValueById);
router.get("/", VariantValueController.getAllVariantValues);
router.post("/", requireIsAdmin, VariantValueController.createVariantValue);
router.patch("/:id", requireIsAdmin, VariantValueController.updateVariantValue);
router.put("/:id", requireIsAdmin, VariantValueController.updateVariantValue);
router.delete("/many", requireIsAdmin, VariantValueController.deleteManyVariantValues);
router.delete("/:id", requireIsAdmin, VariantValueController.deleteVariantValue);

export default router;
