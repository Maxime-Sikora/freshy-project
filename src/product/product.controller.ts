import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { AddProductDto } from './interface/addProduct.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/role.decorateur';
import { UserRoles } from 'src/user/interface/userRoles';
import { RolesGuard } from 'src/guards/roles.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interface/jwtPayload.interface';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  @Roles(UserRoles.Producer)
  @UseGuards(AuthGuard, RolesGuard)
  createProduct(
    @Body() body: AddProductDto,
    @Req() { user },
  ): Promise<ProductEntity> {
    return this.productService.createNewProduct({ ...body, userId: user.sub });
  }

  @Get('all')
  findAllProducts() {
    return this.productService.findAllProducts();
  }

  @Get('myProducts')
  @UseGuards(AuthGuard)
  findAllProductByProducer(@Req() req: Request & { user: JwtPayload }) {
    return this.productService.findAllProductsByProducer(req.user.sub);
  }

  @Get(':id')
  findOneProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductEntity> {
    return this.productService.findOneProduct(id);
  }

  @Put(':id')
  @Roles(UserRoles.Producer)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: AddProductDto,
    @Req() { user },
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(id, { ...body, userId: user.sub });
  }

  @Delete(':id')
  @Roles(UserRoles.Producer)
  @UseGuards(AuthGuard, RolesGuard)
  deleteProduct(@Param('id', ParseIntPipe) id: number, @Req() { user }) {
    return this.productService.deleteProduct(id, { userId: user.sub });
  }
}
