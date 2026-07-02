import { Router } from "express";
import { forgotPasswordController, generateNewTokenController, logInController, logOutController, logOutFromAllDevicesController, registerController, resendOtpController, resetPasswordController, verifyOtpController } from "../controllers/auth.controller";
import { validateRegister, validateLogin } from "../middlewares/validateAuth.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateEmailOnly } from "../middlewares/validateEmail.middleware";
import { validateVerifyOtp } from "../middlewares/validateOtp.middleware";
import { validateRefreshToken } from "../middlewares/validateRefreshToken.middleware";

const authRoutes = Router();

// Register route
authRoutes.post("/register", validateRegister ,registerController)

authRoutes.get("/test", (req, res) => {
    res.send("Server is running properly")
})
// Login route
authRoutes.post("/login", validateLogin ,logInController)

// Generate new token

authRoutes.post("/rotate-token", validateRefreshToken ,generateNewTokenController)

// Verify OTP route
authRoutes.post("/verify-otp", validateVerifyOtp ,verifyOtpController)

//  Resend OTP route

authRoutes.post("/resend-otp",resendOtpController)

//  Forgot password route

authRoutes.post("/forgot-password", forgotPasswordController)

//  Reset password route

authRoutes.post("/reset-password", resetPasswordController)

// Logout route

authRoutes.post("/logout", authMiddleware ,logOutController);

//  LogOut from all devices route

authRoutes.post("/logout-all", authMiddleware ,logOutFromAllDevicesController);

export default authRoutes;