import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Product name must be a string.' })
  @IsNotEmpty({ message: 'Product name cannot be empty.' })
  name!: string;

  @IsNumber({}, { message: 'Product price must be a number.' })
  @IsNotEmpty({ message: 'Price cannot be empty.' })
  price!: number;

  @IsNumber({}, { message: 'Product stock must be a number.' })
  @IsNotEmpty({ message: 'Stock cannot be empty.' })
  stock!: number;
}
