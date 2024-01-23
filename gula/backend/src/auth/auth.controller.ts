import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guard/auth.guard';
import { Permission } from './enum/permission.enum';
import { PermissionGuard } from './guard/permission.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }

  @Post('/login')
  login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Get('/profile')
  @Permission('user')
  @UseGuards(AuthGuard, PermissionGuard)
  profile(@Request() request: any) {
    return request.user;
  }

  @Get('/home')
  @Permission('user')
  @UseGuards(AuthGuard, PermissionGuard)
  home(@Request() request: any) {
    return request.user;
  }
}
