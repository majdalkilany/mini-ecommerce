import { Controller, Post, Body, Get, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { ProductService } from '../services';
import { CreateProductDto, UpdateProductDto } from '../dtos/requests';
import { Product } from '../entities';
import { ProductResponseDto } from '../dtos/responses';
import { RolesGuard } from '~/auth/guards/roles.guard';
import { UserRole } from '~/users/enums';
import { Roles } from '~/auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(UserRole.ADMIN)
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
  @Roles(UserRole.ADMIN)
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    const product = await this.productService.getProductById(id);
    return new ProductResponseDto(product);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    const product = await this.productService.updateProduct(id, updateProductDto);
    return new ProductResponseDto(product);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.productService.deleteProduct(id);
    return { message: 'Product deleted successfully' };
  }
}
