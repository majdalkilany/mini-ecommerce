import { Product } from '~/product/entities';

export class ProductResponseDto {
  id: string;
  name: string;
  price: number;
  stock: number;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.price = +product.price;
    this.stock = product.stock;
  }
}
