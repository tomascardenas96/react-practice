import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: RegisterDto) {
    const findByEmail = await this.userService.findByEmail(user.email);
    const findByUserName = await this.userService.findByUserName(user.username);

    if (findByEmail || findByUserName) {
      throw new BadRequestException('User already exists');
    }

    const roundSalt = 10;
    const salt = await bcryptjs.genSalt(roundSalt);

    return await this.userService.create({
      ...user,
      password: await bcryptjs.hash(user.password, salt),
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('E-mail wrong or inexistent ');
    }
    const isValidPass = await bcryptjs.compare(password, user.password);
    if (!isValidPass) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = { email: user.email };
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtService.signAsync(payload, {
      secret: secretKey,
    });

    return {
      token,
      email,
      message: 'success'
    }
  }
}
