import { BaseRepository } from './base.repository';
import { productModel } from '../models/product.model';
import { UserModel } from '../models/user.model';
import { ProductDocument } from '../types/type';
import { IUser } from '../models/user.model';

class AdminRepository extends BaseRepository<ProductDocument> {
  constructor() {
    super(productModel);
  }

  // Product Operations
  async createProduct(productData: Partial<ProductDocument>): Promise<ProductDocument> {
    return this.create(productData);
  }

  async updateProduct(id: string, updateData: Partial<ProductDocument>): Promise<ProductDocument | null> {
    return this.findByIdAndUpdate(id, updateData);
  }

  async deleteProduct(id: string): Promise<ProductDocument | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async getAllProducts(): Promise<ProductDocument[]> {
    return this.model.find().lean().exec();
  }

  async findProductById(id: string): Promise<ProductDocument | null> {
    return this.findById(id);
  }

  // User Operations (Admin specific)
  async getAllUsers(): Promise<IUser[]> {
    return UserModel.find().select("-password -createdAt -updatedAt -__v").lean().exec();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).select("-password -updatedAt -createdAt -__v").lean().exec();
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return UserModel.findByIdAndDelete(id).exec();
  }

  async findUserByRole(role: string): Promise<IUser[]> {
    return UserModel.find({ role }).select("-password").lean().exec();
  }
}

export const adminRepository = new AdminRepository();