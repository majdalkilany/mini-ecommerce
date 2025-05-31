import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { OrderService } from '../services';
import { CreateOrderDto } from '../dtos/requests';
import { OrderResponseDto } from '../dtos/responses';
import { JwtPayload } from '~/auth/interfaces';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateOrderDto, @Req() req: Request): Promise<OrderResponseDto> {
    const { sub } = req.user as JwtPayload;
    console.log(sub);
    const order = await this.orderService.createOrder(sub, dto);
    return new OrderResponseDto(order);
  }

  @Get()
  async getOrders(@Req() req: Request): Promise<OrderResponseDto[]> {
    const { sub, role } = req.user as JwtPayload;
    console.log(sub, role);
    console.log(role);
    const orders = await this.orderService.getOrders(sub, role);
    return orders.map((order) => new OrderResponseDto(order));
  }
}
