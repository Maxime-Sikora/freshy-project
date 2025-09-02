import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

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
  }): Promise<UserEntity> {
    const passwordHash = await hash(password, 10);
    const saveUser = this.userRepository.create({
      email,
      password: passwordHash,
      firstName,
      lastName,
      role,
    });
    await this.userRepository.save(saveUser);
    return saveUser;
  }

  async updateUserNameOrRole({
    firstName,
    lastName,
    role,
    userId,
  }): Promise<UserEntity> {
    /** TODO: ici je proposerais de faire l'inverse
     * 1. On récupère l'utilisateur et on vérifie si quelques choses a changé
     * 2. On met a jour le cas échéant
     * 3. La question se pose veut-on vraiment renvoyer une erreur si rien n'a changé ?
     */
    const updatedUser = await this.userRepository.update(userId, {
      firstName,
      lastName,
      role,
    });
    if (updatedUser.affected === 0) {
      throw new HttpException(`User not updated`, HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOneBy({ id: userId });
    return user;
  }

  async findOneById(id: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  // TODO: peut être préciser un findOneByEmail ?
  async findOne(email: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({
      email,
    });
  }
}
