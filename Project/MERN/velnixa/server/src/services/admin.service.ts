import { adminRepository } from '../repositories/admin.repository';
import { ProductDocument } from '../types/type';
import { IUser } from '../models/user.model';

class AdminService {
  // Product Services
  async createProduct(productData: {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    section: string;
  }): Promise<ProductDocument> {
    // Validation
    const requiredFields = ['name', 'description', 'price', 'category', 'image', 'rating'];
    for (const field of requiredFields) {
      if (!productData[field as keyof typeof productData]) {
        throw new Error(`${field} is required`);
      }
    }
  
    const product = await adminRepository.createProduct(productData as any);
    
    if (!product) {
      throw new Error('Error while creating product');
    }
    
    return product;
  }

  async updateProduct(id: string, updateData: Partial<ProductDocument>): Promise<ProductDocument> {
    const updatedProduct = await adminRepository.updateProduct(id, updateData);
    
    if (!updatedProduct) {
      throw new Error('Product not found or could not be updated');
    }
    
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    const deletedProduct = await adminRepository.deleteProduct(id);
    
    if (!deletedProduct) {
      throw new Error('Product not found or could not be deleted');
    }
  }

  async getAllProducts(): Promise<ProductDocument[]> {
    const products = await adminRepository.getAllProducts();
    
    if (!products || products.length === 0) {
      throw new Error('No products found');
    }
    
    return products;
  }

  // User Services (Admin only)
  async getAllUsers(): Promise<IUser[]> {
    const users = await adminRepository.getAllUsers();
    
    if (!users || users.length === 0) {
      throw new Error('No users found');
    }
    
    return users;
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await adminRepository.getUserById(id);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const deletedUser = await adminRepository.deleteUser(id);
    
    if (!deletedUser) {
      throw new Error('User not found or could not be deleted');
    }
  }

  async getUsersByRole(role: string): Promise<IUser[]> {
    const users = await adminRepository.findUserByRole(role);
    
    if (!users || users.length === 0) {
      throw new Error(`No ${role} users found`);
    }
    
    return users;
  }
}

export const adminService = new AdminService();