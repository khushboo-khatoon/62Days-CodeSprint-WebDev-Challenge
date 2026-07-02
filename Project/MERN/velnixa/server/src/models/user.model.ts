import { Schema, model, Document } from "mongoose";

export interface IUser extends Document { 
    id?: string; 
    name: string; 
    role?: string; 
    email: string; 
    password: string; 
    isVerified?: boolean; 
    createdAt?: Date; 
    updatedAt?: Date; 
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true }, // ✅ unique automatically creates index
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
            trim: true,
            lowercase: true
        },
        password: { type: String, required: true },
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// ========== INDEXES ==========
// email par unique index already hai (upar unique: true se)
userSchema.index({ role: 1 });   // For filtering users by role (admin/user queries)
// =============================

export const UserModel = model<IUser>("User", userSchema);