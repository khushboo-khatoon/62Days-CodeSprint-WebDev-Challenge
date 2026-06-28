import { Request, Response } from "express";
import { cartService } from "../services/cart.service";
import { IResponse } from "../types/type";

export const addToCartController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { productId, quantity, size } = req.body;

    if (!productId || !size) {
      return res.status(400).json({
        success: false,
        message: "ProductId and size are required",
      } as IResponse);
    }

    const cart = await cartService.addToCart(userId, productId, size, quantity);

    return res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      data: cart,
    } as IResponse);
  } catch (error: any) {
    const status = error.message === "Product not found" ? 404 : 500;
    return res.status(status).json({
      success: false,
      message: error.message || "Error in add to cart"
    } as IResponse);
  }
};

export const getCartController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const cart = await cartService.getCart(userId);

    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        data: null,
      } as IResponse);
    }

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    } as IResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error fetching cart",
    } as IResponse);
  }
};

export const deleteCartController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { productId, size } = req.params;

    const cart = await cartService.removeFromCart(userId, productId as any, size as any);

    return res.status(200).json({
      success: true,
      message: "Item removed successfully",
      data: cart,
    } as IResponse);
  } catch (error: any) {
    const status = error.message === "Cart not found" ? 404 : 500;
    return res.status(status).json({
      success: false,
      message: error.message || "Error deleting item",
    } as IResponse);
  }
};

export const updateQuantityController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { productId, action, size } = req.body;

    if (!productId || !action || !size) {
      return res.status(400).json({
        success: false,
        message: "ProductId, action, and size are required",
      } as IResponse);
    }

    if (action !== "increase" && action !== "decrease") {
      return res.status(400).json({
        success: false,
        message: "Action must be 'increase' or 'decrease'",
      } as IResponse);
    }

    const cart = await cartService.updateQuantity(userId, productId, size, action);

    return res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
      data: cart,
    } as IResponse);
  } catch (error: any) {
    const status = error.message === "Cart not found" || error.message === "Item not found in cart" ? 404 : 500;
    return res.status(status).json({
      success: false,
      message: error.message || "Error updating quantity",
    } as IResponse);
  }
};