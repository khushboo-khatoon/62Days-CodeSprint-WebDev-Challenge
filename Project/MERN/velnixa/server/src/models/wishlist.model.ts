import mongoose, { Schema, model } from "mongoose";

export interface WishlistItem {
  productId: mongoose.Types.ObjectId;
  addedAt: Date;
}

export interface WishlistDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  items: WishlistItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

const wishlistSchema = new Schema<WishlistDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User id is required"],
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: [true, "Product id is required"],
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// ========== INDEXES ==========
wishlistSchema.index({ userId: 1 });              // For user's wishlist fetch
wishlistSchema.index({ "items.productId": 1 });   // For checking product in wishlist
// =============================

export const wishlistModel = model<WishlistDocument>("wishlist", wishlistSchema);