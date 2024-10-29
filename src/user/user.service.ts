import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { UserResponse } from './interface/userResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async createUser({
    email,
    password,
    firstName,
    lastName,
    role,
  }): Promise<UserResponse> {
    const passwordHash = await hash(password, 10);
    const saveUser = await this.userRepository.save({
      email,
      password: passwordHash,
      firstName,
      lastName,
      role,
    });
    delete saveUser.password;
    return saveUser;
  }

  async updateUserNameOrRole(
    id: number,
    { firstName, lastName, role },
  ): Promise<UserResponse> {
    const updatedUser = await this.userRepository.update(id, {
      firstName,
      lastName,
      role,
    });
    if (updatedUser.affected === 0) {
      throw new HttpException(`User not updated`, HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOneBy({ id });
    delete user.password;
    return user;
  }
}
