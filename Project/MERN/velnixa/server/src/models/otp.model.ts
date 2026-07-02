import { Schema, model, Document } from "mongoose";

export interface IOtp extends Document {
    email: string;
    otp: string;
    expiresAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

const otpSchema = new Schema<IOtp>(
    {
        email: { type: String, required: true },
        otp: { type: String, required: true },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);

// ========== INDEXES ==========
otpSchema.index({ email: 1 });   // For finding OTP by email
// TTL index - Auto delete expired OTPs (MongoDB will delete when expiresAt < current time)
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
// =============================

export const otpModel = model<IOtp>("Otp", otpSchema);