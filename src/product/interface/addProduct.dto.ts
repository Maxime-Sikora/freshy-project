import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddProductDto {
  @IsString()
  @IsNotEmpty({ message: 'productName can not be empty or null' })
  productName: string;

  @IsString()
  @IsNotEmpty({ message: 'description can not be empty or null' })
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'price can not be empty or null' })
  price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'categoryId can not be empty or null' })
  categoryId: number;
}
