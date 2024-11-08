import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderOnProductEntity } from './orderOnProduct.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  total_price: number;

  @ManyToOne(() => UserEntity, (user) => user.order)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(
    () => OrderOnProductEntity,
    (orderOnProduct) => orderOnProduct.order,
  )
  orderOnProduct: OrderOnProductEntity[];
}
