import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './interface/signIn.dto';
import { Response } from 'express';
import { AuthCookieService } from './authCookie.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authCookieService: AuthCookieService,
  ) {}
  @Post('signin')
  @HttpCode(204)
  async signIn(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const token = await this.authService.signIn(body);
    this.authCookieService.setAuthCookie(res, token);
  }

  @Post('logout')
  @HttpCode(204)
  logout(@Res({ passthrough: true }) res: Response): void {
    this.authCookieService.clearAuthCookie(res);
  }
}
