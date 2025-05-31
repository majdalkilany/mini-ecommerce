import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderItem } from '~/order/entities';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column('int')
  stock!: number;

  @Column({ default: false })
  isDeleted!: boolean;

  @OneToMany(() => OrderItem, (item: OrderItem) => item.product)
  orderItems!: OrderItem[];
}
