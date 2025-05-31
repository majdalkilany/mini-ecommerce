import { Order } from '../../entities';
import { OrderItem } from '../../entities/order-item.entity';

export class OrderItemResponseDto {
  productId: string | null;
  quantity: number;
  priceAtOrder: number;

  constructor(item: OrderItem) {
    this.productId = item.product?.id ?? null;
    this.quantity = item.quantity;
    this.priceAtOrder = Number(item.priceAtOrder);
  }
}

export class OrderResponseDto {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  items: OrderItemResponseDto[];

  constructor(order: Order) {
    this.id = order.id;
    this.status = order.status;
    this.totalAmount = Number(order.totalAmount);
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
    this.userId = order.user?.id ?? null;

    this.items = Array.isArray(order.items) ? order.items.map((item) => new OrderItemResponseDto(item)) : [];
  }
}
