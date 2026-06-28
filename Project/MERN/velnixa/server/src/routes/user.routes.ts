import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { deleteUserController, getUserController, updateUserController } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", authMiddleware, getUserController);
userRoutes.patch("/:id", authMiddleware, updateUserController)
userRoutes.delete("/:id", authMiddleware, deleteUserController )

export default userRoutes;