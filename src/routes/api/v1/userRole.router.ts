import { Router } from "express";
import UserRoleController from "../../../controllers/userRole.controller";
import { requireLogin } from "../../../middlewares/auth.middleware";

const router = Router();

router.post("/many", requireLogin, UserRoleController.createManyUserRoles);

export default router;
