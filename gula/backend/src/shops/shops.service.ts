import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
    private readonly userService: UserService,
  ) {}

  async create(
    createShopDto: CreateShopDto,
    user: ActiveUserInterface,
  ): Promise<Shop> {
    const foundUser = await this.userService.findByUserName(user.username);
    const parsedShopName = createShopDto.name
      .split(' ')
      .join('-')
      .toLowerCase();

    const newShop = {
      ...createShopDto,
      profileName: parsedShopName,
      user: foundUser,
    };
    return await this.shopRepository.save(newShop);
  }

  findAll() {
    return this.shopRepository.find({ relations: ['user'] });
  }

  async getAllByUser(user: ActiveUserInterface): Promise<Shop[]> {
    const foundUser = await this.userService.findByUserName(user.username);
    return await this.shopRepository.find({
      where: { user: foundUser },
      relations: ['user'],
    });
  }

  async getShopByName(name: string) {
    const foundShop = await this.shopRepository.findOne({ where: { name } });
    if (!foundShop) {
      throw new NotFoundException('Shop not found');
    }

    return foundShop;
  }

  async getShopByProfileName(profileName: string) {
    const foundShop = await this.shopRepository.findOne({
      where: { profileName },
      relations: ['user']
    });
    if (!foundShop) {
      throw new NotFoundException('Shop not found');
    }

    return foundShop;
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
