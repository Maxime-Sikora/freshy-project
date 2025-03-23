import { forwardRef, Inject, Injectable } from '@nestjs/common';
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
    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
  ) {}
  async createOrder(
    orderItems: OrderOnProductDto[],
    userId: number,
  ): Promise<OrderEntity> {
    const user = await this.userService.findOneById(userId);

    // TODO: ici je comprend pas très bien pour quoi tu crée l'order puis tu la save, tu ne peux pas le faire en 1 fois ?
    const order = this.orderRepository.create({
      user: user,
      total_price: 0,
    });
    const saveOrder = await this.orderRepository.save(order);

    let total_price = 0;

    // TODO: tu peux sortir en une fontion qui te calcule le total price getTotalPrice sera en plus plus facile à tester et réutiliser aux besoins
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
    // TODO: pour quoi ne pas faire tout le traitement et ensuite sauvegarder en db, tu t'économise des couts d'appels a ta db
    await this.orderRepository.save(saveOrder);

    // TODO: tu peux ici retourner directement le save ?
    const completeOrder = await this.orderRepository.findOne({
      where: { id: saveOrder.id },
      relations: ['orderOnProduct', 'orderOnProduct.product'],
    });
    return completeOrder;
  }

  async productIsInOrder(productId: number): Promise<boolean> {
    const orderLine = await this.orderOnProductRepository.findOne({
      where: { product: { id: productId } },
    });
    return !!orderLine;
  }
}
