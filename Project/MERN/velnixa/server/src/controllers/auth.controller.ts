import { Request, Response } from "express";
import { registerService, logInService, verifyOtpService, resendOtpService, forgotPasswordService, resetPasswordService } from "../services/auth.services"
import { generateTokens, generateNewAccessToken, logoutService, logoutAllDevicesService } from "../services/token.service";
import { sendOtpEmail } from "../services/email.service";
import { otp } from "../utils/otp.util";
import { hashPassword } from "../utils/hash.util";
import { otpRepository, sessionRepository } from "../repositories";
import { IResponse } from "../types/type";

export const registerController = async (req: Request, res: Response) => {
  try {
    let { name, email, password, role = "user" } = req.body;
    name = name.trim();
    email = email.trim().toLowerCase();
    password = password.trim();
    role = role.trim().toLowerCase();

    const user = await registerService(name, email, password, role);

    if (!user.success) {
      return res.status(400).json({
        success: false,
        message: user.message,
      } as IResponse);
    }

    const generatedOtp = otp();
    await sendOtpEmail(email, generatedOtp);
    const hashOtp = await hashPassword(generatedOtp);
    const otpDb = await otpRepository.createOtp(email, hashOtp, new Date(Date.now() + 5 * 60 * 1000));

    return res.status(201).json({
      success: true,
      message: user.message,
      data: {
        user: {
          email: user.data.email,
          name: user.data.name,
          id: user.data._id,
          otpId: otpDb._id,
        },
      },
    } as IResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      data: error
    } as IResponse);
  }
};

export const logInController = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();
    password = password.trim();

    const user = await logInService(email, password);

    if (!user.success) {
      return res.status(400).json({
        success: false,
        message: user.message,
      } as IResponse);
    }

    const session = await sessionRepository.createSession(
      user.data._id.toString(), 
      "pending"  // ← dummy token, baad mein update ho jayega
    );
    
    const { refreshToken, accessToken } = await generateTokens(
      user.data._id.toString(), 
      user.data.email, 
      session._id.toString()
    );

    const hashedRefreshToken = await hashPassword(refreshToken);
    await sessionRepository.updateToken(session._id.toString(), hashedRefreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        accessToken,
        user: {
          email: user.data.email,
          name: user.data.name,
          id: user.data._id,
        },
      },
    } as IResponse);
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      data: error
    } as IResponse);
  }
};

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const result = await verifyOtpService(email, otp);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      } as IResponse);
    }

    return res.status(200).json({
      success: true,
      message: result.message,
    } as IResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
      data: error
    } as IResponse);
  }
};

export const resendOtpController = async (req: Request, res: Response) => {
  try {
    let { email } = req.body;
    email = email.trim().toLowerCase();

    const result = await resendOtpService(email);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      } as IResponse);
    }

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    } as IResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to resend OTP",
      data: error,
    } as IResponse);
  }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await forgotPasswordService(email);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message
      } as IResponse);
    }

    return res.status(201).json({
      success: true,
      message: result.message,
      data: result.data,
    } as IResponse);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while updating user password"
    } as IResponse);
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;
    const result = await resetPasswordService(email, otp, newPassword);

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message
      } as IResponse);
    }

    return res.status(200).json({
      success: true,
      message: result.message
    } as IResponse);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while updating password"
    } as IResponse);
  }
};

export const generateNewTokenController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token not found",
      } as IResponse);
    }

    const result = await generateNewAccessToken(refreshToken);

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message,
      } as IResponse);
    }

    res.cookie("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: result.message,
      data: { accessToken: result.data.accessToken },
    } as IResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to generate new access token",
      data: error
    } as IResponse);
  }
};

export const logOutController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token not found",
      } as IResponse);
    }

    const result = await logoutService(refreshToken);

    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message } as IResponse);
    }

    res.clearCookie("refreshToken");
    return res.status(200).json({ success: true, message: result.message } as IResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Logout failed",
      data: error
    } as IResponse);
  }
};

export const logOutFromAllDevicesController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token not found",
      } as IResponse);
    }

    const result = await logoutAllDevicesService(refreshToken);

    res.clearCookie("refreshToken");
    return res.status(200).json({
      success: true,
      message: result.message,
    } as IResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Logout from all devices failed",
      data: error
    } as IResponse);
  }
};