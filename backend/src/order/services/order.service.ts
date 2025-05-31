import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository, OrderItemRepository } from '../repositories';
import { ProductService } from '~/product/services';
import { Order } from '../entities';
import { CreateOrderDto } from '../dtos/requests';
import { OrderStatus } from '../enums/order-status.enum';
import { UsersService } from '~/users/services';
import { UserRole } from '~/users/enums';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly orderItemRepo: OrderItemRepository,
    private readonly productService: ProductService,
    private readonly usersService: UsersService,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto): Promise<Order> {
    const user = await this.usersService.getById(userId);
    if (!user) throw new NotFoundException('User not found');

    const order = this.orderRepo.createOne({
      user: user,
      status: OrderStatus.PENDING,
      totalAmount: 0,
    });

    const savedOrder = await this.orderRepo.save(order);

    let total = 0;
    const orderItems = [];

    for (const item of dto.items) {
      const product = await this.productService.getProductById(item.productId);
      if (!product) throw new NotFoundException(`Product ${item.productId} not found`);

      const priceAtOrder = Number(product.price);
      total += priceAtOrder * item.quantity;

      orderItems.push(
        this.orderItemRepo.create({
          order: savedOrder,
          product: product,
          quantity: item.quantity,
          priceAtOrder,
        }),
      );
    }

    const savedItems = await this.orderItemRepo.saveMany(orderItems);

    savedOrder.totalAmount = total;
    savedOrder.items = savedItems;

    return this.orderRepo.save(savedOrder);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepo.findAll();
  }

  async getById(id: string): Promise<Order> {
    const order = await this.orderRepo.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async getOrders(userId: string, role: UserRole): Promise<Order[]> {
    if (role === UserRole.ADMIN) {
      console.log(role);
      return this.orderRepo.findAllWithItemsAndProducts();
    } else {
      console.log('hoooooo')
      const data = await this.orderRepo.findByUserId(userId);
      return data;
    }
  }
}
