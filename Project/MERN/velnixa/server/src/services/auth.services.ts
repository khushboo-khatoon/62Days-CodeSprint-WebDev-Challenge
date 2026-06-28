import { userRepository, otpRepository, sessionRepository } from '../repositories';
import { hashPassword, comparePassword } from '../utils/hash.util';
import { otp } from '../utils/otp.util';
import { sendOtpEmail } from './email.service';
import { IResponse } from '../types/type';

export const registerService = async (name: string, email: string, password: string, role: string): Promise<IResponse> => {
  try {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser && existingUser.isVerified) {
      return {
        success: false,
        message: "User already exists and is verified. Please log in.",
      };
    }

    if (existingUser && !existingUser.isVerified) {
      return {
        success: false,
        message: "User already exists. Please verify your email.",
      };
    }

    const hashPass = await hashPassword(password);

    const newUser = await userRepository.create({ name, email, password: hashPass, role });

    return {
      success: true,
      message: "User registered successfully",
      data: newUser,
    };
  } catch (error: any) {
    return { success: false, message: "Registration failed", data: error };
  }
};

export const logInService = async (email: string, password: string): Promise<IResponse> => {
  try {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      return {
        success: false,
        message: "User not found with this email",
      };
    }

    if (!user.isVerified) {
      return {
        success: false,
        message: "Please verify your email before logging in",
      };
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return { success: false, message: "Invalid credentials" };
    }

    return {
      success: true,
      message: "Login successful",
      data: user,
    };
  } catch (error: any) {
    return { success: false, message: "Login failed" };
  }
};

export const verifyOtpService = async (email: string, otpCode: string): Promise<IResponse> => {
  try {
    const otpRecord = await otpRepository.findByEmail(email);

    if (!otpRecord) {
      return { success: false, message: "OTP not found for this email" };
    }

    if (otpRecord.expiresAt < new Date()) {
      return { success: false, message: "OTP has expired" };
    }

    const isOtpValid = await comparePassword(otpCode, otpRecord.otp);

    if (!isOtpValid) {
      return { success: false, message: "Invalid OTP" };
    }

    await otpRepository.deleteByEmail(email);

    const user = await userRepository.findByEmail(email);
    if (user) {
      user.isVerified = true;
      await user.save();
    }

    return { success: true, message: "OTP verified successfully" };
  } catch (error: any) {
    return { success: false, message: "OTP verification failed", data: error };
  }
};

export const resendOtpService = async (email: string): Promise<IResponse & { data?: any }> => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    return { success: false, message: "User not found with this email" };
  }

  if (user.isVerified) {
    return { success: false, message: "User verified already please go to the login page" };
  }

  const existingOtp = await otpRepository.findByEmail(email);

  if (existingOtp) {
    const isExpired = new Date(existingOtp.expiresAt).getTime() <= Date.now();

    if (!isExpired) {
      const timeLeft = 30 * 1000 - (Date.now() - new Date((existingOtp as any).createdAt).getTime());
      if (timeLeft > 0) {
        return {
          success: false,
          message: `Please wait ${Math.ceil(timeLeft / 1000)} seconds before requesting another OTP.`,
        };
      }
    }
    await otpRepository.deleteByEmail(email);
  }

  const generatedOtp = otp();
  await sendOtpEmail(email, generatedOtp);
  const hashedOtp = await hashPassword(generatedOtp);
  const otpDb = await otpRepository.createOtp(email, hashedOtp, new Date(Date.now() + 5 * 60 * 1000));

  return {
    success: true,
    message: "OTP resent successfully",
    data: { email, otpId: otpDb._id },
  };
};

export const forgotPasswordService = async (email: string): Promise<IResponse & { data?: any }> => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    return { success: false, message: "User not found" };
  }

  const generatedOtp = otp();
  await sendOtpEmail(email, generatedOtp);
  const hashedOtp = await hashPassword(generatedOtp);

  const existingOtp = await otpRepository.findByEmail(email);
  let otpDb;

  if (!existingOtp) {
    otpDb = await otpRepository.createOtp(email, hashedOtp, new Date(Date.now() + 5 * 60 * 1000));
  } else {
    otpDb = await otpRepository.updateOtpByEmail(email, hashedOtp);
  }

  return {
    success: true,
    message: "Otp sent successfully",
    data: {
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
        otpId: otpDb?._id,
      },
    },
  };
};

export const resetPasswordService = async (email: string, otpCode: string, newPassword: string): Promise<IResponse> => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    return { success: false, message: "User not found" };
  }

  const otpRecord = await otpRepository.findByEmail(email);
  if (!otpRecord || otpRecord.expiresAt < new Date()) {
    return { success: false, message: "Invalid or expired OTP" };
  }

  const isValid = await comparePassword(otpCode, otpRecord.otp);
  if (!isValid) {
    return { success: false, message: "Invalid OTP" };
  }

  const newHashedPassword = await hashPassword(newPassword);
  await userRepository.updatePassword(email, newHashedPassword);
  await otpRepository.deleteByEmail(email);

  return { success: true, message: "Password updated successfully" };
};

export const validateOtpOnlyService = async (email: string, otpCode: string): Promise<{ success: boolean; message: string }> => {
  const otpRecord = await otpRepository.findByEmail(email);

  if (!otpRecord) {
    return { success: false, message: "OTP not found" };
  }

  if (otpRecord.expiresAt < new Date()) {
    return { success: false, message: "OTP expired" };
  }

  const isValid = await comparePassword(otpCode, otpRecord.otp);
  if (!isValid) {
    return { success: false, message: "Invalid OTP" };
  }

  return { success: true, message: "OTP valid" };
};