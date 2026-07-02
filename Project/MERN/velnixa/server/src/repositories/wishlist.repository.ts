import { BaseRepository } from './base.repository';
import { wishlistModel } from '../models/wishlist.model';
import { WishlistDocument } from '../types/type';

class WishlistRepository extends BaseRepository<WishlistDocument> {
  constructor() {
    super(wishlistModel);
  }

  async findWishlistByUserId(userId: string): Promise<WishlistDocument | null> {
    return this.model.findOne({ userId }).populate("items.productId").exec();
  }

  async findWishlistByUserIdWithoutPopulate(userId: string): Promise<WishlistDocument | null> {
    return this.findOne({ userId });
  }

  async createWishlist(userId: any, items: any[]): Promise<WishlistDocument> {
    return this.create({ userId, items });
  }

  async updateWishlist(userId: string, items: any[]): Promise<WishlistDocument | null> {
    await this.updateOne({ userId }, { items });
    return this.findWishlistByUserIdWithoutPopulate(userId);
  }

  async deleteWishlist(userId: string): Promise<any> {
    return this.deleteOne({ userId });
  }
}

export const wishlistRepository = new WishlistRepository();