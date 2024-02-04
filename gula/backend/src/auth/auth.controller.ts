import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserPermission } from 'src/common/enum/permission.enum';
import { Auth } from 'src/common/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }

  @Post('/login')
  login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Post('/refresh-token')
  async refresh(@Body('refreshToken') refreshToken: string) {
    const newAccessToken = await this.authService.refreshToken(refreshToken);
    return { token: newAccessToken };
  }

  @Get('/profile/:profilename')
  @Auth(UserPermission.USER)
  profile(@Param('profilename') profilename: string) {
    return this.userService.findByProfileName(profilename);
  }

  @Get('/home')
  @Auth(UserPermission.USER)
  home(@ActiveUser() user: ActiveUserInterface) {
    return user;
  }
}
