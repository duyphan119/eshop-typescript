import { Router } from "express";
import ProductUserController from "../../../controllers/productUser.controller";
import { requireIsUser } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/", requireIsUser, ProductUserController.getAllProductUsers);
router.post("/", requireIsUser, ProductUserController.createProductUser);
router.delete("/:productId", requireIsUser, ProductUserController.deleteProductUser);

export default router;
