import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly userService: UserService,
  ) {}

  async create(profileName: string, user: User) {
    const findProfile = await this.profileRepository.findOneBy({ user });
    if (findProfile) {
      return;
    }

    const newProfile = this.profileRepository.create({
      profileName,
      user,
    });
    return await this.profileRepository.save(newProfile);
  }

  async uploadFile(file: Express.Multer.File, activeUser: ActiveUserInterface) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    const user = await this.userService.findActiveUser(activeUser);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const profile = await this.profileRepository.findOneBy({ user });

    profile.profilepicture = file.filename;

    await this.profileRepository.save(profile);

    return file;
  }

  //Proveer al frontend con el perfil de cada usuario.
  async getProfileByUser(email: string) {
    const user = await this.userService.findByEmail(email);
    const profile = this.profileRepository.findOne({
      where: { user },
      relations: ['user'],
    });
    if (!user) {
      throw new NotFoundException('No user');
    }

    if (!profile) {
      throw new NotFoundException('User have not an active profile');
    }

    return profile;
  }

  async getActiveUserProfile(activeUser: ActiveUserInterface) {
    const user = await this.userService.findActiveUser(activeUser);
    return await this.profileRepository.findOneBy({ user });
  }

  getProfileByProfileName(profileName: string) {
    return this.profileRepository.findOneBy({ profileName });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
