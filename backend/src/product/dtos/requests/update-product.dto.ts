import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'Product name must be a string.' })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number.' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Stock must be a number.' })
  stock?: number;
}
