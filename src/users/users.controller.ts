import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  Query,
  Patch,
  Param,
  NotFoundException,
  
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { UseInterceptors } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';

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
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  public async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  @Get()
  public findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Patch('/:id')
  public updateUser(@Param('id') id: string, @Body() body: updateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  public removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
