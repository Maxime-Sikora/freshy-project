import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
  ) {}
  async createCategory({ name }): Promise<CategoryEntity> {
    const result = await this.categoriesRepository.save({ name });
    return result;
  }

  async findOneById(id: number): Promise<CategoryEntity> {
    const result = await this.categoriesRepository.findOneBy({ id });
    return result;
  }

  async findAllCategories(): Promise<CategoryEntity[]> {
    const categories = this.categoriesRepository.find();
    return categories;
  }

  async updateCategory(id: number, { name }): Promise<CategoryEntity> {
    const result = await this.categoriesRepository.update(id, { name });
    if (result.affected === 0) {
      throw new HttpException(
        `Category not found or not updated`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.categoriesRepository.findOneBy({ id });
  }

  async deleteCategory(id: number) {
    const result = await this.categoriesRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(
        `This category does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return { message: `The category has been deleted successfully` };
  }
}