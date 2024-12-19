import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  /**
   *
   * @param body
   */
  @Post('/signup')
  public createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
  }

  @Get('/auth/:id')
  public findUser(@Param('id') id: string) {}

  @Get('/auth?email')
  public findAllUsers(@Query('email') email: string) {}
  @Patch('auth/:id')
  public updateUser() {}

  @Delete('auth/:id')
  public removeUser() {}
}
