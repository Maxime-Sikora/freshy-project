import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { OrderOnProductDto } from './interfaces/orderOnProduct.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard)
  createNewOrder(
    @Body() orderItems: OrderOnProductDto[],
    @Req() { user },
  ): Promise<OrderEntity> {
    const userId: number = user.sub;
    return this.orderService.createOrder(orderItems, userId);
  }
}
