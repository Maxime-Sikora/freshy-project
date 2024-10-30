import { IsEnum, IsString } from 'class-validator';
import { UserRoles } from './userRoles';

export class UpdateUserNameOrRoleDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(UserRoles)
  role: UserRoles;
}
