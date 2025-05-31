import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities';
import { UpdateProductDto } from '../dtos/requests';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  create(product: Partial<Product>) {
    return this.repo.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.repo.find({
      where: { isDeleted: false },
    });
  }

  async getById(id: string): Promise<Product | null> {
    return this.repo.findOne({
      where: { id, isDeleted: false },
    });
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.getById(id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    Object.assign(product, dto);
    return this.repo.save(product);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.repo.update(id, { isDeleted: true });
  }
}
