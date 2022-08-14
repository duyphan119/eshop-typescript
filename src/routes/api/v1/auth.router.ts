import { Router } from "express";
import AuthController from "../../../controllers/auth.controller";
import { requireLogin } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/profile", requireLogin, AuthController.getProfile);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refreshToken);
router.patch("/change-password", AuthController.changePassword);
router.delete("/logout", AuthController.logout);

export default router;
