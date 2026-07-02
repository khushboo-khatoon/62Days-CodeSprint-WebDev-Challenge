import { Schema, model, Document } from "mongoose";

export interface ISession extends Document {
    userId: string;
    token?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const sessionSchema = new Schema<ISession>(
    {
        userId: { type: String, required: true },
        token: { type: String },
    },
    { timestamps: true }
);

// ========== INDEXES ==========
sessionSchema.index({ userId: 1 });   // For user session lookup
sessionSchema.index({ token: 1 });    // For token-based session validation
// TTL index - Auto delete sessions after 7 days
sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });
// =============================

export const sessionModel = model<ISession>("Session", sessionSchema);