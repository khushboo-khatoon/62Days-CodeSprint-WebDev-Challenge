import {Schema, model} from "mongoose";
import { CartDocument } from "../types/type";

const cartSchema = new Schema<CartDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: [true, "Product is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required for product"],
        },
        price: {
          type: Number,
          required: [true, "Price is required for storing that product"],
        },
        size: {
          type: String,
          enum: ["S", "M", "L", "XL", "XXL"],
          required: [true, "Size is required for storing that product"],
        },
      },
    ],
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

// ========== INDEXES ==========
cartSchema.index({ userId: 1 });              // For getCart by user
cartSchema.index({ "items.productId": 1 });   // For product lookup in cart
// =============================

export const cartModel = model<CartDocument>("cart", cartSchema);