import { Router } from "express";
import AuthController from "../../../controllers/auth.controller";
import { requireLogin } from "../../../middlewares/auth.middleware";

const router = Router();

router.get("/profile", requireLogin, AuthController.getProfile);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refreshToken);
router.patch("/change-password", AuthController.changePassword);
router.patch("/profile", requireLogin, AuthController.editProfile);
router.put("/change-password", AuthController.changePassword);
router.put("/profile", requireLogin, AuthController.editProfile);
router.delete("/logout", AuthController.logout);

export default router;
