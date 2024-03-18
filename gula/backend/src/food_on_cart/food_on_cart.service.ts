import { Injectable } from '@nestjs/common';
import { UpdateFoodOnCartDto } from './dto/update-food_on_cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodOnCart } from './entities/food_on_cart.entity';
import { Repository } from 'typeorm';
import { Food } from 'src/food/entities/food.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FoodOnCartService {
  constructor(
    @InjectRepository(FoodOnCart)
    private readonly foodOnCartRepository: Repository<FoodOnCart>,
  ) {}

  create(food: Food, cart: Cart, amount: number) {
    const foodOnCart = this.foodOnCartRepository.create({
      food,
      cart,
      amount,
    });

    return this.foodOnCartRepository.save(foodOnCart);
  }

  findAllByUser(cart: Cart) {
    return this.foodOnCartRepository.find({
      where: { cart },
      relations: ['food'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} foodOnCart`;
  }

  update(id: number, updateFoodOnCartDto: UpdateFoodOnCartDto) {
    return `This action updates a #${id} foodOnCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodOnCart`;
  }
}
