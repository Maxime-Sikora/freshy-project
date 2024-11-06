import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './interfaces/createCompany.dto';
import { CompanyEntity } from './entities/company.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}
  @Post()
  @UseGuards(AuthGuard)
  createCompany(
    @Body() body: CreateCompanyDto,
    @Req() { user },
  ): Promise<CompanyEntity> {
    return this.companyService.createCompany({ ...body, userId: user.sub });
  }

  @Get()
  findAllCompany(): Promise<CompanyEntity[]> {
    return this.companyService.findAll();
  }
}
