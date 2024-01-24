import { Injectable } from '@nestjs/common';
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
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findByUserName(username: string) {
    return this.userRepository.findOneBy({ username });
  }
}
