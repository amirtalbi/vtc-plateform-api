import { Controller, Post, Put, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from '../auth/dto/signup.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: SignupDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(id, updateUserDto);
  }
}
