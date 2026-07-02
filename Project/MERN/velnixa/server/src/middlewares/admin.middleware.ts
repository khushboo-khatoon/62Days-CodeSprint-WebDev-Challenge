import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { IResponse } from "../types/type";
import { userRepository } from "../repositories/user.repository";

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  
  if(!token) {
    return res.status(409).json({
      success: false,
      message: "Please login first"
    } as IResponse);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await userRepository.findById((decoded as any).userId);
    
    if(!user || user.role !== "admin") {
      return res.status(409).json({
        success: false,
        message: "You don't have access"
      } as IResponse);
    }

    (req as any).user = user;
    (req as any).userId = user._id;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    } as IResponse);   
  }
};