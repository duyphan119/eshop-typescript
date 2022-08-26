import { Router } from "express";
import MetaController from "../../../controllers/meta.controller";
import { requireIsAdmin } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", MetaController.getMetaById);
router.get("/", MetaController.getAllMeta);
router.post("/", requireIsAdmin, MetaController.createMeta);
router.patch("/:id", requireIsAdmin, MetaController.updateMeta);
router.put("/:id", requireIsAdmin, MetaController.updateMeta);
router.delete("/many", requireIsAdmin, MetaController.deleteManyMeta);
router.delete("/:id", requireIsAdmin, MetaController.deleteMeta);

export default router;
