// src/order/repositories/order.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(private readonly dataSource: DataSource) {}

  private get repo(): Repository<Order> {
    return this.dataSource.getRepository(Order);
  }

  createOne(data: Partial<Order>): Order {
    return this.repo.create(data);
  }

  async save(order: Order): Promise<Order> {
    return this.repo.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.repo.find({ relations: ['items', 'user'] });
  }

  findById(id: string): Promise<Order | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['items', 'user'],
    });
  }
}
