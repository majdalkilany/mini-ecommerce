import { IsArray, IsInt, IsNotEmpty, IsUUID, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemInput {
  @IsUUID('4', { message: 'Product ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Product ID is required.' })
  productId!: string;

  @IsInt({ message: 'Quantity must be an integer.' })
  @Min(1, { message: 'Quantity must be at least 1.' })
  quantity!: number;
}

export class CreateOrderDto {
  @IsUUID('4', { message: 'Product ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'User ID is required.' })
  userId!: string;

  @IsArray({ message: 'Items must be an array.' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemInput)
  items!: OrderItemInput[];
}
