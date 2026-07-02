import { BaseRepository } from './base.repository';
import { productModel } from '../models/product.model';
import { ProductDocument } from '../types/type';

class ProductRepository extends BaseRepository<ProductDocument> {
  constructor() {
    super(productModel);
  }

  async findBySection(section: string): Promise<ProductDocument[]> {
    return this.model.find({ section }).lean().exec();
  }

  async findByCategory(category: string): Promise<ProductDocument[]> {
    return this.model.find({ category }).lean().exec();
  }

  async findById(id: string): Promise<ProductDocument | null> {
    return this.model.findById(id).lean().exec();
  }

  async findByMultipleSections(sections: string[]): Promise<ProductDocument[]> {
    return this.model.find({ section: { $in: sections } }).lean().exec();
  }
}

export const productRepository = new ProductRepository();