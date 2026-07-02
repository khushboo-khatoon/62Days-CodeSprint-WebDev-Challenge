import { BaseRepository } from './base.repository';
import { cartModel } from '../models/cart.model';
import { CartDocument } from '../types/type';

class CartRepository extends BaseRepository<CartDocument> {
  constructor() {
    super(cartModel);
  }

  async findCartByUserId(userId: string): Promise<CartDocument | null> {
    return this.model.findOne({ userId }).populate("items.productId").exec();
  }

  async findCartByUserIdWithoutPopulate(userId: string): Promise<CartDocument | null> {
    return this.findOne({ userId });
  }

  async createCart(userId: any, items: any[], totalPrice: number): Promise<CartDocument> {
    return this.create({ userId, items, totalPrice });
  }

  async updateCart(userId: string, items: any[], totalPrice: number): Promise<CartDocument | null> {
    return this.findOneAndUpdate({ userId }, { items, totalPrice });
  }

  async deleteCart(userId: string): Promise<any> {
    return this.deleteOne({ userId });
  }
}

export const cartRepository = new CartRepository();