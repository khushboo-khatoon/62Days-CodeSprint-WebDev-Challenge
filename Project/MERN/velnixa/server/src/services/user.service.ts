import { userRepository } from '../repositories/user.repository';
import { IUser } from '../models/user.model';

class UserService {
  async getUserProfile(userId: string): Promise<IUser> {
    const user = await userRepository.getUserProfile(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }

  async updateUserProfile(userId: string, updateData: { name?: string; email?: string }): Promise<IUser> {
    const user = await userRepository.updateUserProfile(userId, updateData);
    
    if (!user) {
      throw new Error('User not found or could not be updated');
    }
    
    return user;
  }

  async deleteUserProfile(userId: string): Promise<void> {
    const user = await userRepository.deleteUserProfile(userId);
    
    if (!user) {
      throw new Error('User not found or could not be deleted');
    }
  }
}

export const userService = new UserService();