import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponse } from './interface/userResponse';
import { CreateUserDto } from './interface/createUser.dto';
import { UpdateUserNameOrRoleDto } from './interface/updateUserNameOrRole.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  createNewUser(@Body() body: CreateUserDto): Promise<UserResponse> {
    return this.userService.createUser(body);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserNameOrRoleDto,
  ): Promise<UserResponse> {
    return this.userService.updateUserNameOrRole(id, body);
  }
}
