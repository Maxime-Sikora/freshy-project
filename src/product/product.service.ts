import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private categoriesService: CategoriesService,
  ) {}
  async createNewProduct({
    productName,
    description,
    price,
    categoryId,
  }): Promise<ProductEntity> {
    const category = await this.categoriesService.findOneById(categoryId);
    if (!category) {
      throw new HttpException(
        `Category not found to create the product`,
        HttpStatus.NOT_FOUND,
      );
    }
    const newProduct = await this.productRepository.save({
      productName,
      description,
      price,
      category,
    });
    return newProduct;
  }

  async findAllProducts(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find();
    return products;
  }

  async findOneProduct(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async updateProduct(
    id: number,
    { productName, description, price, categoryId },
  ): Promise<ProductEntity> {
    const category = await this.categoriesService.findOneById(categoryId);
    if (!category) {
      throw new HttpException(`Category not found`, HttpStatus.NOT_FOUND);
    }
    const result = await this.productRepository.update(id, {
      productName,
      description,
      price,
      category,
    });

    if (result.affected === 0) {
      throw new HttpException(
        `Product not found or not updated`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedProduct = this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!updatedProduct) {
      throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);
    }
    return updatedProduct;
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
