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
    const product = await this.productRepository.getById(id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    return this.productRepository.updateProduct(id, dto);
  }

  async deleteProduct(id: string): Promise<void> {
    return this.productRepository.deleteProduct(id);
  }
}
