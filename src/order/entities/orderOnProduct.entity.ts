import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

@Entity()
export class OrderOnProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderOnProduct)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderOnProduct)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @Column('int')
  quantity: number;

  @Column('decimal')
  total_line_product: number;
}
