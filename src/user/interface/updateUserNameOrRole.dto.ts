import { IsString } from 'class-validator';

export class UpdateUserNameOrRoleDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  role: string;
}
