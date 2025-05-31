// src/order/controllers/order.controller.ts
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OrderService } from '../services';
import { CreateOrderDto } from '../dtos/requests';
import { OrderResponseDto } from '../dtos/responses';
import { Order } from '../entities';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateOrderDto): Promise<OrderResponseDto> {
    const order = await this.orderService.createOrder(dto);
    return new OrderResponseDto(order);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<OrderResponseDto[]> {
    const orders = await this.orderService.findAll();
    return orders.map((order: Order) => new OrderResponseDto(order));
  }

}
