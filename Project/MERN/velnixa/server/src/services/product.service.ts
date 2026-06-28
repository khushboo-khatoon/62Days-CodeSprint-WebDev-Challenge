import { productRepository } from '../repositories/product.repository';
import { ProductDocument } from '../types/type';

class ProductService {
  async getProductsBySection(section: string): Promise<ProductDocument[]> {
    return productRepository.findBySection(section);
  }

  async getProductsByCategory(category: string): Promise<ProductDocument[]> {
    const products = await productRepository.findByCategory(category);
    
    if (products.length === 0) {
      throw new Error('No products found in this category');
    }
    
    return products;
  }

  async getProductById(id: string): Promise<ProductDocument> {
    const product = await productRepository.findById(id);
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    return product;
  }

  async getNewArrivals(): Promise<ProductDocument[]> {
    return productRepository.findBySection('newArrivals');
  }

  async getHomePageProducts(): Promise<{
    dataProducts: ProductDocument[];
    popularProducts: ProductDocument[];
    menProducts: ProductDocument[];
    womenProducts: ProductDocument[];
    kidsProducts: ProductDocument[];
    newArrivals: ProductDocument[];
  }> {
    const [dataProducts, popularProducts, menProducts, womenProducts, kidsProducts, newArrivals] = await Promise.all([
      productRepository.findBySection('data'),
      productRepository.findBySection('popular'),
      productRepository.findBySection('men'),
      productRepository.findBySection('women'),
      productRepository.findBySection('kids'),
      productRepository.findBySection('newArrivals'),
    ]);

    return {
      dataProducts,
      popularProducts,
      menProducts,
      womenProducts,
      kidsProducts,
      newArrivals,
    };
  }
}

export const productService = new ProductService();