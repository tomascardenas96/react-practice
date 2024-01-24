import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guard/auth.guard';
import { Permission } from './decorators/permission.decorator';
import { PermissionGuard } from './guard/permission.guard';
import Request from 'express';
import { UserPermission } from 'src/user/entities/permission.enum';

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
  @UseGuards(AuthGuard)
  profile(@Req() req: Request & {user: { email: string, permission: string }}) {
    return req.user;
  }

  @Get('/home')
  @UseGuards(AuthGuard)
  home(@Req() req: Request & {user: { email: string, permission: string }}) {
    return req.user;
  }
}
