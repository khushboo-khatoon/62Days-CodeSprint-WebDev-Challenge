import { otpModel } from "../models/otp.model";
import { comparePassword } from "../utils/hash.util";

export const validateOtpOnly = async (
  email: string,
  otp: string
) => {

  const otpRecord = await otpModel.findOne({ email });

  if (!otpRecord) {
    return {
      success: false,
      message: "OTP not found",
    };
  }

  if (otpRecord.expiresAt < new Date()) {
    return {
      success: false,
      message: "OTP expired",
    };
  }

  const isValid =
    await comparePassword(
      otp,
      otpRecord.otp
    );

  if (!isValid) {
    return {
      success: false,
      message: "Invalid lauda OTP",
    };
  }

  return {
    success: true,
    message: "OTP valid",
  };
};