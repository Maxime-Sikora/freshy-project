import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
    private userService: UserService,
  ) {}
  async createCompany({
    company_name,
    street_company,
    zip_code_company,
    city_company,
    phone_number_company,
    userId,
  }): Promise<CompanyEntity> {
    const user = await this.userService.findOneById(userId);
    const saveCompany = await this.companyRepository.save({
      company_name,
      street_company,
      zip_code_company,
      city_company,
      phone_number_company,
      user,
    });
    delete saveCompany.user.password;
    return saveCompany;
  }

  async findAll(): Promise<CompanyEntity[]> {
    const AllCompany = await this.companyRepository.find({
      relations: ['user'],
    });
    return AllCompany;
  }
}
