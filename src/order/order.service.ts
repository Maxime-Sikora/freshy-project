import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderOnProductEntity } from './entities/orderOnProduct.entity';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { OrderOnProductDto } from './interfaces/orderOnProduct.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderOnProductEntity)
    private orderOnProductRepository: Repository<OrderOnProductEntity>,
    private userService: UserService,
    private productService: ProductService,
  ) {}
  async createOrder(
    orderItems: OrderOnProductDto[],
    userId: number,
  ): Promise<OrderEntity> {
    const user = await this.userService.findOneById(userId);

    const order = this.orderRepository.create({
      user: user,
      total_price: 0,
    });
    const saveOrder = await this.orderRepository.save(order);

    let total_price = 0;

    for (const item of orderItems) {
      const product = await this.productService.findOneProduct(item.productId);
      const totalLine = product.price * item.quantity;
      total_price += totalLine;
      const orderOnProduct = this.orderOnProductRepository.create({
        order: saveOrder,
        product: product,
        quantity: item.quantity,
        total_line_product: totalLine,
      });
      await this.orderOnProductRepository.save(orderOnProduct);
    }
    saveOrder.total_price = total_price;
    await this.orderRepository.save(saveOrder);

    const completeOrder = await this.orderRepository.findOne({
      where: { id: saveOrder.id },
      relations: ['orderOnProduct', 'orderOnProduct.product'],
    });
    return completeOrder;
  }
}
