import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { sessionRepository } from '../repositories';
import { hashPassword, comparePassword } from '../utils/hash.util';
import { IResponse } from '../types/type';
import { UserModel } from '../models/user.model';

export const generateTokens = async (userId: string, email: string, sessionId: string) => {
  const refreshToken = jwt.sign(
    { userId, sessionId },
    config.jwtSecret,
    { expiresIn: "7d" }
  );

  const accessToken = jwt.sign(
    { userId, email },
    config.jwtSecret,
    { expiresIn: "15m" }
  );

  return { refreshToken, accessToken };
};

export const generateNewAccessToken = async (refreshToken: string): Promise<IResponse & { data?: any }> => {
  let decoded: any;

  try {
    decoded = jwt.verify(refreshToken, config.jwtSecret);
  } catch {
    return { success: false, message: "Invalid or expired refresh token" };
  }

  const session = await sessionRepository.findBySessionId(decoded.sessionId);

  if (!session) {
    return { success: false, message: "Session not found" };
  }

  const isValid = await comparePassword(refreshToken, (session as any).token);

  if (!isValid) {
    return { success: false, message: "Invalid refresh token" };
  }

  const user = await UserModel.findById(decoded.userId);

  if (!user) {
    return { success: false, message: "User not found" };
  }

  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    config.jwtSecret,
    { expiresIn: "15m" }
  );

  const newRefreshToken = jwt.sign(
    { userId: user._id, sessionId: session._id },
    config.jwtSecret,
    { expiresIn: "7d" }
  );

  const hashedRefreshToken = await hashPassword(newRefreshToken);
  await sessionRepository.updateToken(session._id.toString(), hashedRefreshToken);

  return {
    success: true,
    message: "New access token generated successfully",
    data: { accessToken, refreshToken: newRefreshToken },
  };
};

export const logoutService = async (refreshToken: string): Promise<IResponse> => {
  const decoded = jwt.verify(refreshToken, config.jwtSecret) as any;
  const session = await sessionRepository.findBySessionId(decoded.sessionId);

  if (!session) {
    return { success: false, message: "Session not found" };
  }

  await sessionRepository.deleteBySessionId(session._id.toString());
  return { success: true, message: "Logged out successfully" };
};

export const logoutAllDevicesService = async (refreshToken: string): Promise<IResponse> => {
  const decoded = jwt.verify(refreshToken, config.jwtSecret) as any;
  await sessionRepository.deleteManyByUserId(decoded.userId);
  return { success: true, message: "Logged out from all devices successfully" };
};