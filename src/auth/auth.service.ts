import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn({ email, password }): Promise<string> {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new UnauthorizedException(`Email or password incorrect`);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException(`Email or password incorrect`);
    }

    const payload = { sub: user.id, username: user.email, role: user.role };
    return this.jwtService.signAsync(payload);
  }
}
