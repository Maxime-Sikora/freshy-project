import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse } from './interface/AuthResponse';
import { SignInDto } from './interface/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  signIn(@Body() body: SignInDto): Promise<AuthResponse> {
    return this.authService.signIn(body);
  }
}
