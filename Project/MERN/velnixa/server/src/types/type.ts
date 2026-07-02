import { Types, Document } from "mongoose";

export interface CartItem {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
  size: "S" | "M" | "L" | "XL" | "XXL";
}

export interface CartDocument extends Document {
  userId: Types.ObjectId;
  items: CartItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export type Category = "MEN" | "WOMEN" | "KIDS";

export type Section =
  | "data"
  | "collectionData"
  | "men"
  | "women"
  | "kids"
  | "newArrivals";

export interface ProductDocument extends Document {
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  rating: number;
  section: Section;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = "USER" | "ADMIN";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface WishlistItem {
  productId: Types.ObjectId;
  addedAt: Date;
}

export interface WishlistDocument extends Document {
  userId: Types.ObjectId;
  items: WishlistItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IResponse {
    success: boolean;
    message: string;
    data?: any;
}