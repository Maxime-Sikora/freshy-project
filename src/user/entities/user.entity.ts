import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRoles } from '../interface/userRoles';
import { ProductEntity } from 'src/product/entities/product.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

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
  @JoinColumn()
  product: ProductEntity;
}
