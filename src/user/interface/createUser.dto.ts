import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRoles } from './userRoles';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(UserRoles)
  role: UserRoles;
}
