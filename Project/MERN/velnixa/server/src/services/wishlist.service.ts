import mongoose from 'mongoose';
import { wishlistRepository } from '../repositories/wishlist.repository';
import { productRepository } from '../repositories/product.repository';
import { WishlistDocument } from '../types/type';

class WishlistService {
  async toggleWishlist(userId: string, productId: string): Promise<{ wishlist: WishlistDocument | null; isAdded: boolean }> {
    // Validate product
    const product = await productRepository.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    let wishlist = await wishlistRepository.findWishlistByUserIdWithoutPopulate(userId);
    let isAdded = false;

    // Convert string to ObjectId
    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Create new wishlist if doesn't exist
    if (!wishlist) {
      // ✅ Fix: Add addedAt field
      wishlist = await wishlistRepository.createWishlist(userId, [{
        productId: productObjectId,
        addedAt: new Date()
      }]);
      isAdded = true;

      // Return populated wishlist
      const populatedWishlist = await wishlistRepository.findWishlistByUserId(userId);
      return { wishlist: populatedWishlist, isAdded };
    }

    // Check if product exists in wishlist
    const itemIndex = wishlist.items.findIndex(
      (item: any) => item.productId && item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Remove from wishlist
      wishlist.items.splice(itemIndex, 1);
      isAdded = false;
    } else {
      // ✅ Fix: Add addedAt field
      wishlist.items.push({
        productId: productObjectId,
        addedAt: new Date()
      });
      isAdded = true;
    }

    // If wishlist is empty, delete it
    if (wishlist.items.length === 0) {
      await wishlistRepository.deleteWishlist(userId);
      return { wishlist: null, isAdded };
    }

    // Update wishlist
    await wishlistRepository.updateWishlist(userId, wishlist.items);

    // Return populated wishlist
    const populatedWishlist = await wishlistRepository.findWishlistByUserId(userId);
    return { wishlist: populatedWishlist, isAdded };
  }

  async getWishlist(userId: string): Promise<WishlistDocument | null> {
    const wishlist = await wishlistRepository.findWishlistByUserId(userId);

    if (!wishlist || wishlist.items.length === 0) {
      return null;
    }

    // Filter out any null products (deleted products)
    wishlist.items = wishlist.items.filter((item: any) => item.productId);

    return wishlist;
  }

  async removeFromWishlist(userId: string, productId: string): Promise<WishlistDocument | null> {
    const wishlist = await wishlistRepository.findWishlistByUserIdWithoutPopulate(userId);

    if (!wishlist) {
      throw new Error('Wishlist not found');
    }

    // Filter out the product
    wishlist.items = wishlist.items.filter(
      (item: any) => item.productId.toString() !== productId
    );

    // If wishlist is empty, delete it
    if (wishlist.items.length === 0) {
      await wishlistRepository.deleteWishlist(userId);
      return null;
    }

    // Update wishlist
    await wishlistRepository.updateWishlist(userId, wishlist.items);

    // Return populated wishlist
    return await wishlistRepository.findWishlistByUserId(userId);
  }

  async clearWishlist(userId: string): Promise<void> {
    await wishlistRepository.deleteWishlist(userId);
  }
}

export const wishlistService = new WishlistService();