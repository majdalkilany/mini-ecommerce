// src/product/repositories/product.repository.ts
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

  findAll() {
    return this.repo.find();
  }

  async getById(id: string): Promise<Product> {
    return this.repo.findOneByOrFail({ id });
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.getById(id);
    Object.assign(product, dto);
    return this.repo.save(product);
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.getById(id);
    await this.repo.remove(product);
  }
}
