import { IsNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  company_name: string;

  @IsString()
  street_company: string;

  @IsNumber()
  zip_code_company: number;

  @IsString()
  city_company: string;

  @IsString()
  phone_number_company: string;
}
