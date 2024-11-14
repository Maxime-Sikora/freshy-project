import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './interface/createUser.dto';
import { UpdateUserNameOrRoleDto } from './interface/updateUserNameOrRole.dto';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  createNewUser(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(body);
  }

  // TODO: Peut être ajouter une guard supplémentaire pour que seul les user Admin puisse changer leur role
  @Put()
  @UseGuards(AuthGuard)
  updateUser(
    @Req() { user },
    @Body() body: UpdateUserNameOrRoleDto,
  ): Promise<UserEntity> {
    return this.userService.updateUserNameOrRole({ ...body, userId: user.sub });
  }
}
