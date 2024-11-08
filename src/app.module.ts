import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './typeormconfig';
import { ProductModule } from './product/product.module';
import { CategoriesModule } from './categories/categories.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    ProductModule,
    CategoriesModule,
    UserModule,
    AuthModule,
    CompanyModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
