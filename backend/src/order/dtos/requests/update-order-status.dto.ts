import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../../enums/order-status.enum';

export class UpdateOrderDto {
  @IsEnum(OrderStatus, { message: 'Status must be either PENDING or CONFIRMED' })
  @IsOptional()
  status?: OrderStatus;
}
