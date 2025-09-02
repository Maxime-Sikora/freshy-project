import { IsNumber } from 'class-validator';

export class OrderOnProductDto {
  // TODO: rajouter une validation pour que le prix soit positif: @Min(0, { message: 'productId must be positive' })
  @IsNumber()
  productId: number;

  // TODO: rajouter une validation pour que le prix soit positif: @Min(0, { message: 'quantity must be positive' })
  @IsNumber()
  quantity: number;
}
