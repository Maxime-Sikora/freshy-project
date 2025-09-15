import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthCookieService {
  constructor(private configService: ConfigService) {}

  setAuthCookie(res: Response, token: string) {
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite:
        this.configService.get<'lax' | 'strict' | 'none'>('COOKIE_SAMESITE') ??
        'lax',
      domain: this.configService.get('COOKIE_DOMAIN') ?? undefined,
      path: '/',
      maxAge: Number(
        this.configService.get('COOKIE_MAX_AGE') ?? 1000 * 60 * 60 * 24 * 7,
      ),
    });
  }

  clearAuthCookie(res: Response) {
    res.clearCookie('access_token', {
      path: '/',
      domain: this.configService.get('COOKIE_DOMAIN') ?? undefined,
      sameSite:
        this.configService.get<'lax' | 'strict' | 'none'>('COOKIE_SAMESITE') ??
        'lax',
      secure: this.configService.get('NODE_ENV') === 'production',
    });
  }
}
