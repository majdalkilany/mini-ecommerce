import { Controller, Post, Body, Get, Delete, Param, Put } from '@nestjs/common';
import { ProductService } from '../services';
import { CreateProductDto, UpdateProductDto } from '../dtos/requests';
import { Product } from '../entities';
import { ProductResponseDto } from '../dtos/responses';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }
  @Get()
  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.productService.getAllProducts();
    return products.map((p: Product): ProductResponseDto => new ProductResponseDto(p));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    const product = await this.productService.getProductById(id);
    return new ProductResponseDto(product);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    const product = await this.productService.updateProduct(id, updateProductDto);
    return new ProductResponseDto(product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.productService.deleteProduct(id);
    return { message: 'Product deleted successfully' };
  }
}
