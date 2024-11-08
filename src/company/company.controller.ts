import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './interfaces/createCompany.dto';
import { CompanyEntity } from './entities/company.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/role.decorateur';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRoles } from 'src/user/interface/userRoles';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}
  @Post()
  @Roles(UserRoles.Producer)
  @UseGuards(AuthGuard, RolesGuard)
  createCompany(
    @Body() body: CreateCompanyDto,
    @Req() { user },
  ): Promise<CompanyEntity> {
    return this.companyService.createCompany({ ...body, userId: user.sub });
  }

  @Put()
  @Roles(UserRoles.Producer)
  @UseGuards(AuthGuard, RolesGuard)
  updateCompany(
    @Body() body: CreateCompanyDto,
    @Req() { user },
  ): Promise<CompanyEntity> {
    return this.companyService.updateCompany({ ...body, userId: user.sub });
  }

  @Get()
  findAllCompany(): Promise<CompanyEntity[]> {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOneCompany(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.findOneById(id);
  }
}
