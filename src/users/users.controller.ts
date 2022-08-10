import { Serialize, SerializerInterceptor } from './../interceptors/serialize.interceptor';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Body, Controller, UseInterceptors, Delete, Get, Param, Patch, Post, Query, ClassSerializerInterceptor, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';



@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor( private userService: UsersService, private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() sessionStorage: any) {
    const user = await this.authService.signup(body.email, body.password)
    sessionStorage.userId = user.id
    return user
  }
  @Post('/login')
  async login(@Body() body: CreateUserDto, @Session() sessionStorage: any) {
    const user = await this.authService.login(body.email, body.password)
    sessionStorage.userId = user.id
    return user
  }
  @Get('/me')
  getMyself (@CurrentUser() user: string) {
    return user
  }
  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null
  }

  @Patch('/:id')
  updateUser (@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body)
  }
  // @UseInterceptors(new SerializerInterceptor(UserDto))
  
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