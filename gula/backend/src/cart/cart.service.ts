import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly userService: UserService,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const user = await this.userService.findByEmail(createCartDto.user);
    const verifyExistenceOfCart = await this.cartRepository.findOne({
      where: { user },
    });

    if (verifyExistenceOfCart) {
      return;
    }

    const newCart = this.cartRepository.create({
      user,
    });

    return this.cartRepository.save(newCart);
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
