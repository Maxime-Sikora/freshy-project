import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}
  async createNewProduct({
    productName,
    description,
    price,
  }): Promise<ProductEntity> {
    const newProduct = await this.productRepository.save({
      productName,
      description,
      price,
    });
    return newProduct;
  }

  async findAllProducts(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find();
    return products;
  }

  async findOneProduct(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({ id });
    return product;
  }

  async updateProduct(
    id: number,
    { productName, description, price, status },
  ): Promise<ProductEntity> {
    const result = await this.productRepository.update(id, {
      productName,
      description,
      price,
      status,
    });

    if (result.affected === 0) {
      throw new HttpException(
        `Product not found or not updated`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.productRepository.findOneBy({ id });
  }

  async deleteProduct(id: number) {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(
        `This product does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return { message: `The product has been deleted successfully` };
  }
}
