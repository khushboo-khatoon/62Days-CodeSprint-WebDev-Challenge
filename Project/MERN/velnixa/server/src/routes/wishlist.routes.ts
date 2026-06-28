import { Router } from "express";
import {
  toggleWishlistController,
  getWishlistController,
  removeFromWishlistController
} from "../controllers/wishlist.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const wishlistRouter = Router();

wishlistRouter.post("/toggle", authMiddleware, toggleWishlistController);
wishlistRouter.get("/", authMiddleware, getWishlistController);
wishlistRouter.delete("/:productId", authMiddleware, removeFromWishlistController);

export default wishlistRouter;