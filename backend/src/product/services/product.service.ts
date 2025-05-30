// src/product/services/product.service.ts
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories';
import { CreateProductDto, UpdateProductDto } from '../dtos/requests';
import { Product } from '../entities';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(dto: CreateProductDto) {
    return this.productRepository.create(dto);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<Product> {
    return this.productRepository.getById(id);
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    return this.productRepository.updateProduct(id, dto);
  }

  async deleteProduct(id: string): Promise<void> {
    return this.productRepository.deleteProduct(id);
  }
}
