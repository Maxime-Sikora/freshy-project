import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private categoriesService: CategoriesService,
    private userService: UserService,
  ) {}
  async createNewProduct({
    productName,
    description,
    price,
    categoryId,
    userId,
  }): Promise<ProductEntity> {
    const category = await this.categoriesService.findOneById(categoryId);
    if (!category) {
      throw new HttpException(
        `Category not found to create the product`,
        HttpStatus.NOT_FOUND,
      );
    }
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new HttpException(
        `User not found to create the product`,
        HttpStatus.NOT_FOUND,
      );
    }
    const newProduct = await this.productRepository.save({
      productName,
      description,
      price,
      category,
      user,
    });
    return newProduct;
  }

  async findAllProducts(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({
      relations: ['user'],
    });
    return products;
  }

  async findOneProduct(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!product) {
      throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async updateProduct(
    id: number,
    { productName, description, price, categoryId, userId },
  ): Promise<ProductEntity> {
    const [category, user, product] = await Promise.all([
      this.categoriesService.findOneById(categoryId),
      this.userService.findOneById(userId),
      this.findOneProduct(id),
    ]);
    if (!category) {
      throw new HttpException(`Category not found`, HttpStatus.NOT_FOUND);
    }
    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }
    if (!product) {
      throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);
    }
    if (userId !== product.user.id) {
      throw new UnauthorizedException(
        `You are not authorized to update this product`,
      );
    }
    Object.assign(product, { productName, description, price });
    const updatedProduct = await this.productRepository.save(product);
    return updatedProduct;
  }

  async deleteProduct(id: number, { userId }) {
    const product = await this.findOneProduct(id);
    if (product.user.id !== userId) {
      throw new UnauthorizedException(
        `You are not authorized to delete this product`,
      );
    }
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
