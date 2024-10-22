import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStatus } from '../interface/productStatus';

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
  })
  status: string;
}
