import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductEntity } from './product/entities/product.entity';
import { CategoryEntity } from './categories/entities/category.entity';
import { UserEntity } from './user/entities/user.entity';
import { CompanyEntity } from './company/entities/company.entity';

config();

const options: DataSourceOptions = {
  //@ts-expect-error ignore type error for database type
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  migrations: ['./dist/migration/*.js'],
  entities: [ProductEntity, CategoryEntity, UserEntity, CompanyEntity],
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...options,
  synchronize: false,
};

export const connectionSource = new DataSource(options);
