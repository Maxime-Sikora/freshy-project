import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_name: string;

  @Column()
  street_company: string;

  @Column()
  zip_code_company: number;

  @Column()
  city_company: string;

  @Column()
  phone_number_company: string;

  @OneToOne(() => UserEntity, (user) => user.company)
  @JoinColumn()
  user: UserEntity;
}
