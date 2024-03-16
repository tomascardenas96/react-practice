import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  create(user: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...user,
      profilename: user.email,
    });
    return this.userRepository.save(newUser);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User non-existent');
    }

    return user;
  }

  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: [
        'userId',
        'email',
        'username',
        'password',
        'role',
        'permission',
        'profilename',
      ],
    });
  }

  findByUserName(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  async findByProfileName(profilename: string) {
    const foundUser = await this.userRepository.findOneBy({ profilename });
    if (!foundUser) {
      throw new NotFoundException('User not found by profile name');
    }
    return foundUser;
  }
}
