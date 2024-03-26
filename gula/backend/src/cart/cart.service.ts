import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { FoodOnCartService } from 'src/food_on_cart/food_on_cart.service';
import { FoodService } from 'src/food/food.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly userService: UserService,
    private readonly foodOnCartService: FoodOnCartService,
    private readonly foodService: FoodService,
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

  async addFoodOnCart(
    addToCart: AddToCartDto,
    activeUser: ActiveUserInterface,
  ) {
    const user = await this.userService.findByProfileName(
      activeUser.profilename,
    );
    const cart = await this.cartRepository.findOne({ where: { user } });
    const food = await this.foodService.findById(addToCart.food);
    if (!food) {
      throw new NotFoundException('Food not found');
    }

    const existentFoodOnCart = await this.foodOnCartService.findByFoodAndCart(
      food,
      cart,
    );
    if (existentFoodOnCart) {
      existentFoodOnCart.amount += 1;
      return this.foodOnCartService.update(
        existentFoodOnCart.foodOnCartId,
        existentFoodOnCart,
      );
    }

    return this.foodOnCartService.create(food, cart);
  }

  async findAllByUser(activeUser: ActiveUserInterface) {
    const user = await this.userService.findByProfileName(
      activeUser.profilename,
    );
    const cart = await this.cartRepository.findOne({ where: { user } });

    return this.foodOnCartService.findAllByUser(cart);
  }

  async findCartByUser(activeUser: ActiveUserInterface) {
    const user = await this.userService.findByProfileName(
      activeUser.profilename,
    );
    return this.cartRepository.findOneBy({ user });
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
