import { Request, Response } from "express";
import { wishlistService } from "../services/wishlist.service";
import { IResponse } from "../types/type";

export const toggleWishlistController = async (req: Request, res: Response) => {
  try {
    // ✅ Fix: Add null check
    const user = (req as any).user;
    if (!user || !user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      } as IResponse);
    }
    
    const userId = user._id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "ProductId is required",
      } as IResponse);
    }

    const { wishlist, isAdded } = await wishlistService.toggleWishlist(userId.toString(), productId);

    return res.status(200).json({
      success: true,
      message: isAdded ? "Product added to wishlist" : "Product removed from wishlist",
      data: wishlist,
    } as IResponse);
  } catch (error: any) {
    console.error("Toggle wishlist error:", error);
    const status = error.message === "Product not found" ? 404 : 500;
    return res.status(status).json({
      success: false,
      message: error.message || "Error in toggle wishlist",
    } as IResponse);
  }
};

export const getWishlistController = async (req: Request, res: Response) => {
  try {
    // ✅ Fix: Add null check
    const user = (req as any).user;
    if (!user || !user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      } as IResponse);
    }
    
    const userId = user._id;
    const wishlist = await wishlistService.getWishlist(userId.toString());

    if (!wishlist || wishlist.items.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Wishlist is empty",
        data: null,
      } as IResponse);
    }

    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      data: wishlist,
    } as IResponse);
  } catch (error: any) {
    console.error("Get wishlist error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error fetching wishlist",
    } as IResponse);
  }
};

export const removeFromWishlistController = async (req: Request, res: Response) => {
  try {
    // ✅ Fix: Add null check for user
    const user = (req as any).user;
    if (!user || !user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      } as IResponse);
    }
    
    const userId = user._id;
    const { productId } = req.params;

    // ✅ Fix: Proper validation for productId
    if (!productId || productId === "") {
      return res.status(400).json({
        success: false,
        message: "ProductId is required",
      } as IResponse);
    }

    // ✅ Fix: Ensure productId is string
    const wishlist = await wishlistService.removeFromWishlist(userId.toString(), productId as string);

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      data: wishlist,
    } as IResponse);
  } catch (error: any) {
    console.error("Remove wishlist error:", error);
    const status = error.message === "Wishlist not found" ? 404 : 500;
    return res.status(status).json({
      success: false,
      message: error.message || "Error removing product from wishlist",
    } as IResponse);
  }
};