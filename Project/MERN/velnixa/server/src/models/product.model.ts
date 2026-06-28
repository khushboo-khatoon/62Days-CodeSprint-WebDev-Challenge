import {Schema, model} from "mongoose";
import { ProductDocument } from "../types/type";

const productSchema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["MEN", "WOMEN", "KIDS"],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    section: {
      type: String,
      enum: [
        "data",
        "collectionData",
        "men",
        "women",
        "kids",
        "newArrivals",
      ],
      required: [true, "Section is required"],
    },
  },
  { timestamps: true }
);

// ========== INDEXES ==========
productSchema.index({ section: 1 });           // For findBySection queries
productSchema.index({ category: 1 });          // For findByCategory queries
productSchema.index({ section: 1, category: 1 }); // Compound index for combined filters
// =============================

export const productModel = model<ProductDocument>("product", productSchema);