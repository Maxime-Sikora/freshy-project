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
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Post()
  createCategory(@Body() body: CategoryEntity): Promise<CategoryEntity> {
    return this.categoriesService.createCategory(body);
  }

  @Get('all')
  findAllCategories(): Promise<CategoryEntity[]> {
    return this.categoriesService.findAllCategories();
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOneById(id);
  }

  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CategoryEntity,
  ): Promise<CategoryEntity> {
    return this.categoriesService.updateCategory(id, body);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
