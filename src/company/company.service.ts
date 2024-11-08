import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    const company = await this.companyRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (company) {
      throw new UnauthorizedException(`You already have a Company`);
    }
    const user = await this.userService.findOneById(userId);
    if (user.role !== 'producer') {
      throw new UnauthorizedException(
        `You are not authorized to create a company`,
      );
    }
    const saveCompany = await this.companyRepository.save({
      company_name,
      street_company,
      zip_code_company,
      city_company,
      phone_number_company,
      user,
    });
    return saveCompany;
  }

  async updateCompany({
    company_name,
    street_company,
    zip_code_company,
    city_company,
    phone_number_company,
    userId,
  }): Promise<CompanyEntity> {
    const company = await this.companyRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!company) {
      throw new HttpException(`You don't have company`, HttpStatus.NOT_FOUND);
    }
    const companyToUpdate = await this.companyRepository.update(company.id, {
      company_name,
      street_company,
      zip_code_company,
      city_company,
      phone_number_company,
    });
    if (companyToUpdate.affected === 0) {
      throw new HttpException(`Company not updated`, HttpStatus.BAD_REQUEST);
    }
    const updatedCompany = await this.companyRepository.findOne({
      where: { id: company.id },
      relations: ['user'],
    });
    return updatedCompany;
  }

  async findAll(): Promise<CompanyEntity[]> {
    const AllCompany = await this.companyRepository.find({
      relations: ['user'],
    });
    return AllCompany;
  }

  async findOneById(id: number): Promise<CompanyEntity> {
    const oneCompany = await this.companyRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return oneCompany;
  }
}
