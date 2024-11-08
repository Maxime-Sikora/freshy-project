import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRoles } from '../interface/userRoles';
import { ProductEntity } from 'src/product/entities/product.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { Exclude } from 'class-transformer';
import { OrderEntity } from 'src/order/entities/order.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    enum: UserRoles,
    default: UserRoles.Customer,
    enumName: 'user_roles_enum',
  })
  role: string;

  @OneToMany(() => ProductEntity, (product) => product.user)
  product: ProductEntity[];

  @OneToOne(() => CompanyEntity, (company) => company.user, { nullable: true })
  company: CompanyEntity;

  @OneToMany(() => OrderEntity, (order) => order.user)
  order: OrderEntity[];
}
