import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import { IResponse } from "../types/type";
import { config } from "../config/config";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    } as IResponse);
  }

  try {
    const decoded: any = jwt.verify(token, config.jwtSecret as string);

    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      } as IResponse);
    }

    (req as any).id = decoded.userId;
    (req as any).user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    } as IResponse);
  }
};