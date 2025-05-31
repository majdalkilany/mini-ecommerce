import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OrderItem } from '../entities/order-item.entity';

@Injectable()
export class OrderItemRepository {
  constructor(private readonly dataSource: DataSource) {}

  private get repo(): Repository<OrderItem> {
    return this.dataSource.getRepository(OrderItem);
  }

  create(data: Partial<OrderItem>): OrderItem {
    return this.repo.create(data);
  }

  async saveMany(items: OrderItem[]): Promise<OrderItem[]> {
    return this.repo.save(items);
  }
}
