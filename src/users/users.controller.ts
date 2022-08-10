import { SerializerInterceptor } from './../interceptors/serialize.interceptor';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Body, Controller, UseInterceptors, Delete, Get, Param, Patch, Post, Query, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor( private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password)
  }

  @Patch('/:id')
  updateUser (@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body)
  }
  @UseInterceptors(SerializerInterceptor)
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id))
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userService.find(email)
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id))
  }

}