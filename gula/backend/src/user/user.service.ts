import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly profileService: ProfileService,
  ) {}

  //Este metodo posiblemente no se utilice
  findAll() {
    return this.userRepository.find();
  }

  create(user: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...user,
    });
    return this.userRepository.save(newUser);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  //Metodo utilizado para el login (dentro de auth service), es igual al metodo findByEmail a diferencia que este metodo muestra la contraseña (aunque este hasheada, se necesita para hacer la comparacion en el mismo metodo de login)
  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['userId', 'email', 'username', 'password', 'role', 'permission'],
    });
  }

  findByUserName(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  async findByProfileName(profileName: string) {
    const profile =
      await this.profileService.getProfileByProfileName(profileName);
    const foundUser = await this.userRepository.findOneBy({
      userId: profile.user.userId,
    });
    if (!foundUser) {
      throw new NotFoundException('User not found by profile name');
    }
    return foundUser;
  }

  async findActiveUser(activeUser: ActiveUserInterface) {
    const user = await this.userRepository.findOne({
      where: { userId: activeUser.userId },
    });

    return user;
  }
}
