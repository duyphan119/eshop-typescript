import { Router } from "express";
import BannerController from "../../../controllers/banner.controller";
import { requireIsAdmin } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", BannerController.getBannerById);
router.get("/", BannerController.getAllBanners);
router.post("/", requireIsAdmin, BannerController.createBanner);
router.patch("/:id", requireIsAdmin, BannerController.updateBanner);
router.put("/:id", requireIsAdmin, BannerController.updateBanner);
router.delete("/many", requireIsAdmin, BannerController.deleteManyBanners);
router.delete("/:id", requireIsAdmin, BannerController.deleteBanner);

export default router;
