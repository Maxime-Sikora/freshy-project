import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { UserResponse } from './interface/userResponse';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  private toUserDto(user: UserEntity): UserResponse {
    const { id, email, firstName, lastName, role } = user;
    return { id, email, firstName, lastName, role };
  }
  async createUser({
    email,
    password,
    firstName,
    lastName,
    role,
  }): Promise<UserResponse> {
    try {
      const passwordHash = await hash(password, 10);
      const saveUser = this.userRepository.create({
        email,
        password: passwordHash,
        firstName,
        lastName,
        role,
      });
      await this.userRepository.save(saveUser);
      return this.toUserDto(saveUser);
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserNameOrRole({
    firstName,
    lastName,
    role,
    userId,
  }): Promise<UserResponse> {
    const updatedUser = await this.userRepository.update(userId, {
      firstName,
      lastName,
      role,
    });
    if (updatedUser.affected === 0) {
      throw new HttpException(`User not updated`, HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOneBy({ id: userId });
    return this.toUserDto(user);
  }

  async findOneByIdWithToken(req: Request): Promise<UserResponse | null> {
    const token = await req.cookies?.['access_token'];
    if (!token) return null;
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('SECRET_TOKEN'),
      });
      const id = payload.sub;
      const user = await this.userRepository.findOneBy({ id });
      return this.toUserDto(user);
    } catch (error) {
      console.error('Une erreur est survenue : ', error);
    }
  }

  async findOneById(id: number): Promise<UserResponse> {
    const user = await this.userRepository.findOneBy({ id });
    return this.toUserDto(user);
  }

  async findOne(email: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({
      email,
    });
  }
}
