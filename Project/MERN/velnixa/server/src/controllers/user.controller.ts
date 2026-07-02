import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { IResponse } from "../types/type";

export const getUserController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const user = await userService.getUserProfile(userId);

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user
    } as IResponse);
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message || "User not found"
    } as IResponse);
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;

    if (!name && !email) {
      return res.status(400).json({
        success: false,
        message: "At least one field (name or email) is required for update",
      } as IResponse);
    }

    const user = await userService.updateUserProfile(userId as any, { name, email });

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: user
    } as IResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error updating user profile",
    } as IResponse);
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await userService.deleteUserProfile(userId as any);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully"
    } as IResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error deleting user",
    } as IResponse);
  }
};