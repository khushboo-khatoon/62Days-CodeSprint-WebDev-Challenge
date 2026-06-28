import { BaseRepository } from './base.repository';
import { IOtp, otpModel } from '../models/otp.model';

class OtpRepository extends BaseRepository<IOtp> {
  constructor() {
    super(otpModel);
  }

  async findByEmail(email: string): Promise<IOtp | null> {
    return this.findOne({ email });
  }

  async deleteByEmail(email: string): Promise<any> {
    return this.deleteOne({ email });
  }

  async createOtp(email: string, hashedOtp: string, expiresAt: Date): Promise<IOtp> {
    return this.create({ email, otp: hashedOtp, expiresAt });
  }

  async updateOtpByEmail(email: string, hashedOtp: string): Promise<IOtp | null> {
  return this.findOneAndUpdate(
    { email }, 
    { otp: hashedOtp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) }
  );
}
}

export const otpRepository = new OtpRepository();