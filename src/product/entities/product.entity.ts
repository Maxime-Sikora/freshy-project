import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductStatus } from '../interface/productStatus';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({
    enum: ProductStatus,
    default: ProductStatus.ActiveProduct,
    enumName: 'product_status_enum',
  })
  status: string;

  @ManyToOne(() => CategoryEntity, (category) => category.product)
  @JoinColumn()
  category: CategoryEntity;

  @ManyToOne(() => UserEntity, (user) => user.product)
  @JoinColumn()
  user: UserEntity;
}
