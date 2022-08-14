import { Router } from "express";
import ProductController from "../../../controllers/product.controller";
import { requireIsAdmin } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", ProductController.getProductById);
router.get("/", ProductController.getAllProducts);
router.post("/", requireIsAdmin, ProductController.createProduct);
router.patch("/:id", requireIsAdmin, ProductController.updateProduct);
router.put("/:id", requireIsAdmin, ProductController.updateProduct);
router.delete("/many", requireIsAdmin, ProductController.deleteManyProducts);
router.delete("/:id", requireIsAdmin, ProductController.deleteProduct);

export default router;
