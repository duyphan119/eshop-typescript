import { requireIsAdmin } from "../../../middlewares/auth.middleware";
import { Router } from "express";
import UserController from "../../../controllers/user.controller";

const router = Router();

router.get("/:id", requireIsAdmin, UserController.getUserById);
router.get("/", UserController.getAllUsers);
router.post("/", requireIsAdmin, UserController.createUser);
router.patch("/:id", requireIsAdmin, UserController.updateUser);
router.put("/:id", requireIsAdmin, UserController.updateUser);
router.delete("/many", requireIsAdmin, UserController.deleteManyUsers);
router.delete("/:id", requireIsAdmin, UserController.deleteUser);

export default router;
