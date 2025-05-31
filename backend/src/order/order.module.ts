import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers';
import { OrderService } from './services';
import { OrderItemRepository, OrderRepository } from './repositories';
import { Order, OrderItem } from './entities';
import { ProductModule } from '~/product/product.module';
import { UsersModule } from '~/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), ProductModule, UsersModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, OrderItemRepository],
  exports: [OrderService],
})
export class OrderModule {}
