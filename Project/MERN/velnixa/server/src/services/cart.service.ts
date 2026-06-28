import { cartRepository } from '../repositories/cart.repository';
import { productRepository } from '../repositories/product.repository';
import { CartDocument } from '../types/type';

class CartService {
  async addToCart(userId: string, productId: string, size: any, quantity: number = 1): Promise<CartDocument> {
    // Validate product
    const product = await productRepository.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Validate size
    const validSizes = ["S", "M", "L", "XL", "XXL"];
    if (!validSizes.includes(size)) {
      throw new Error('Invalid size');
    }

    const qty = Math.max(1, Number(quantity) || 1);
    
    // Find existing cart
    let cart = await cartRepository.findCartByUserIdWithoutPopulate(userId);

    // Create new cart if doesn't exist
    if (!cart) {
      const newCart = await cartRepository.createCart(userId, [
        {
          productId: product._id,
          quantity: qty,
          price: product.price,
          size,
        }
      ], product.price * qty);
      
      // Populate and return
      return await cartRepository.findCartByUserId(userId) as CartDocument;
    }

    // Find existing item
    const itemIndex = cart.items.findIndex(
      (item: any) => item.productId.toString() === productId && item.size === size
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += qty;
    } else {
      cart.items.push({
        productId: product._id,
        quantity: qty,
        price: product.price,
        size,
      });
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    );

    // Update cart
    await cartRepository.updateCart(userId, cart.items, cart.totalPrice);
    
    // Return populated cart
    return await cartRepository.findCartByUserId(userId) as CartDocument;
  }

  async getCart(userId: string): Promise<CartDocument | null> {
    const cart = await cartRepository.findCartByUserId(userId);
    
    if (!cart || cart.items.length === 0) {
      return null;
    }
    
    return cart;
  }

  async removeFromCart(userId: string, productId: string, size: string): Promise<CartDocument | null> {
    let cart = await cartRepository.findCartByUserIdWithoutPopulate(userId);
    
    if (!cart) {
      throw new Error('Cart not found');
    }

    // Filter out the item
    cart.items = cart.items.filter(
      (item: any) => !(item.productId.toString() === productId && item.size === size)
    );

    // Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    );

    // If cart is empty, delete it
    if (cart.items.length === 0) {
      await cartRepository.deleteCart(userId);
      return null;
    }

    // Update cart
    await cartRepository.updateCart(userId, cart.items, cart.totalPrice);
    
    // Return populated cart
    return await cartRepository.findCartByUserId(userId);
  }

  async updateQuantity(userId: string, productId: string, size: string, action: 'increase' | 'decrease'): Promise<CartDocument | null> {
    const cart = await cartRepository.findCartByUserIdWithoutPopulate(userId);
    
    if (!cart) {
      throw new Error('Cart not found');
    }

    const itemIndex = cart.items.findIndex(
      (item: any) => item.productId.toString() === productId && item.size === size
    );

    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }

    if (action === 'increase') {
      cart.items[itemIndex].quantity += 1;
    } else if (action === 'decrease') {
      cart.items[itemIndex].quantity -= 1;
      
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
    }

    // If cart is empty, delete it
    if (cart.items.length === 0) {
      await cartRepository.deleteCart(userId);
      return null;
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    );

    // Update cart
    await cartRepository.updateCart(userId, cart.items, cart.totalPrice);
    
    // Return populated cart
    return await cartRepository.findCartByUserId(userId);
  }

  async clearCart(userId: string): Promise<void> {
    await cartRepository.deleteCart(userId);
  }
}

export const cartService = new CartService();