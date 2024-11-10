import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './entities/category.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/role.decorateur';
import { UserRoles } from 'src/user/interface/userRoles';
import { CreateCategoriesDto } from './interfaces/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.Admin)
  createCategory(@Body() body: CreateCategoriesDto): Promise<CategoryEntity> {
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.Admin)
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateCategoriesDto,
  ): Promise<CategoryEntity> {
    return this.categoriesService.updateCategory(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.Admin)
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
