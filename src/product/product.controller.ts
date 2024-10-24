import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  createProduct(@Body() body: ProductEntity): Promise<ProductEntity> {
    return this.productService.createNewProduct(body);
  }

  @Get('all')
  findAllProducts() {
    return this.productService.findAllProducts();
  }

  @Get(':id')
  findOneProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductEntity> {
    return this.productService.findOneProduct(id);
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProductEntity,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(id, body);
  }
}
