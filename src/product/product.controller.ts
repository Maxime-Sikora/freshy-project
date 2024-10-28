import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { AddProductDto } from './interface/addProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  createProduct(@Body() body: AddProductDto): Promise<ProductEntity> {
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
    @Body() body: AddProductDto,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(id, body);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
