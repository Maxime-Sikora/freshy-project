import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './interface/createUser.dto';
import { UpdateUserNameOrRoleDto } from './interface/updateUserNameOrRole.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserResponse } from './interface/userResponse';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  createNewUser(@Body() body: CreateUserDto): Promise<UserResponse> {
    return this.userService.createUser(body);
  }

  @Put()
  @UseGuards(AuthGuard)
  updateUser(
    @Req() { user },
    @Body() body: UpdateUserNameOrRoleDto,
  ): Promise<UserResponse> {
    return this.userService.updateUserNameOrRole({ ...body, userId: user.sub });
  }

  @Get()
  @HttpCode(200)
  findOneUser(@Req() req: Request): Promise<UserResponse | null> {
    return this.userService.findOneByIdWithToken(req);
  }
}
