import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from './userRoles';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  /**
   * TODO : ici tu peux t'amuser a rajouter de la validation sur le mot de passe ex :
   *  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
   *   @MaxLength(20, { message: 'Password must not exceed 20 characters.' })
   *   @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
   *   @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
   *   @Matches(/\d/, { message: 'Password must contain at least one number.' })
   *   @Matches(/[@$!%*?&#]/, { message: 'Password must contain at least one special character (@$!%*?&#).' })
   *
   **/
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum(UserRoles)
  @IsNotEmpty()
  role: UserRoles;
}
