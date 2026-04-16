import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.userService.register(body.name, body.password);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.userService.login(body.name, body.password);
  }

  @Post('change-password')
  changePassword(@Body() body: any) {
    return this.userService.changePassword(
      body.name,
      body.oldPassword,
      body.newPassword,
    );
  }
}