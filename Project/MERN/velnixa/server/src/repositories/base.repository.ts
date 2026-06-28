import { Model, Document } from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(protected model: Model<T>) {}

  async findOne(filter: Record<string, any>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async updateOne(filter: Record<string, any>, update: Record<string, any>): Promise<any> {
    return this.model.updateOne(filter, update).exec();
  }

  async findOneAndUpdate(filter: Record<string, any>, update: Record<string, any>): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, update, { returnDocument: 'after' }).exec();
  }

  async deleteOne(filter: Record<string, any>): Promise<any> {
    return this.model.deleteOne(filter).exec();
  }

  async deleteMany(filter: Record<string, any>): Promise<any> {
    return this.model.deleteMany(filter).exec();
  }

  async findByIdAndUpdate(id: string, update: Record<string, any>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, { returnDocument: 'after' }).exec();
  }

  async findByIdAndDelete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async find(filter: Record<string, any> = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async findLean(filter: Record<string, any> = {}): Promise<any[]> {
    return this.model.find(filter).lean().exec();
  }
}