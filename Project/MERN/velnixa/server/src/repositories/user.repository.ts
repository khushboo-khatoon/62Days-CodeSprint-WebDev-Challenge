import { BaseRepository } from './base.repository';
import { IUser, UserModel } from '../models/user.model';

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.findOne({ email });
  }

  async findByIdAndUpdateVerified(id: string, isVerified: boolean): Promise<IUser | null> {
    return this.findByIdAndUpdate(id, { isVerified });
  }

  async updatePassword(email: string, hashedPassword: string): Promise<any> {
    return this.updateOne({ email }, { password: hashedPassword });
  }

  // Profile methods
  async updateUserProfile(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return this.findByIdAndUpdate(id, updateData);
  }

  async deleteUserProfile(id: string): Promise<IUser | null> {
    return this.findByIdAndDelete(id);
  }

  async getUserProfile(id: string): Promise<IUser | null> {
    return this.findById(id);
  }
}

export const userRepository = new UserRepository();