import { IsNumber } from 'class-validator';

export class OrderOnProductDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}
