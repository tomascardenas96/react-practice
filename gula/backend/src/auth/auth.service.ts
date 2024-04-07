import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly profileService: ProfileService,
  ) {}

  async register(user: RegisterDto) {
    const findByEmail = await this.userService.findByEmail(user.email);
    const findByUserName = await this.userService.findByUserName(user.username);

    if (findByEmail || findByUserName) {
      throw new BadRequestException('User already exists');
    }

    const roundSalt = 10;
    const salt = await bcryptjs.genSalt(roundSalt);

    await this.userService.create({
      ...user,
      password: await bcryptjs.hash(user.password, salt),
    });

    return {
      email: user.email,
      username: user.username,
      message: 'Register succesfull',
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('E-mail wrong or inexistent ');
    }
    const isValidPass = await bcryptjs.compare(password, user.password);
    if (!isValidPass) {
      throw new UnauthorizedException('Incorrect password');
    }

    //Crea un perfil para el usuario en caso que no posea uno.
    await this.profileService.create(email, user);

    //Estos son los datos que van a ir encriptados dentro del token.
    const payload = {
      userId: user.userId,
      username: user.username,
      permission: user.permission,
    };

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtService.signAsync(payload, {
      secret: secretKey,
    });
    //No darle bola
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: secretKey,
      expiresIn: '7d',
    });

    return {
      token,
      refreshToken,
      email,
      message: 'success',
    };
  }

  //Este no lo vamos a implementar.
  async refreshToken(refreshToken: string) {
    try {
      const decodedToken = await this.jwtService.decode(refreshToken);
      const payload = {
        userId: decodedToken.userId,
        profilename: decodedToken.profilename,
        username: decodedToken.username,
        permission: decodedToken.permission,
      };

      const secretKey = process.env.JWT_SECRET;

      const token = await this.jwtService.signAsync(payload, {
        secret: secretKey,
      });

      await this.jwtService.verifyAsync(refreshToken, {
        secret: secretKey,
      });

      return token;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
