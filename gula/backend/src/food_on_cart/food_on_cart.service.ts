import { Injectable } from '@nestjs/common';
import { UpdateFoodOnCartDto } from './dto/update-food_on_cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodOnCart } from './entities/food_on_cart.entity';
import { Repository } from 'typeorm';
import { Food } from 'src/food/entities/food.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { User } from 'src/user/entities/user.entity';
import AddOrSubstractDto from './dto/add-or-substract.dto';

@Injectable()
export class FoodOnCartService {
  constructor(
    @InjectRepository(FoodOnCart)
    private readonly foodOnCartRepository: Repository<FoodOnCart>,
  ) {}

  create(food: Food, cart: Cart) {
    const foodOnCart = this.foodOnCartRepository.create({
      food,
      cart,
    });

    return this.foodOnCartRepository.save(foodOnCart);
  }

  findAllByUser(cart: Cart) {
    return this.foodOnCartRepository.find({
      where: { cart },
      relations: ['food', 'food.shop'],
    });
  }

  async findByFoodAndCart(food: Food, cart: Cart) {
    return await this.foodOnCartRepository.findOne({
      where: { cart, food },
    });
  }

  update(id: number, updateFoodOnCartDto: UpdateFoodOnCartDto) {
    const updated = this.foodOnCartRepository.update(id, updateFoodOnCartDto);
    return updated;
  }

  async addOrSubstractAmount(id: number, addOrSubstractDto: AddOrSubstractDto) {
    const findFoodOnCart = await this.foodOnCartRepository.findOne({
      where: { foodOnCartId: id },
    });

    if (addOrSubstractDto.operation === 'add') {
      findFoodOnCart.amount += 1;
    }

    if (addOrSubstractDto.operation === 'substract') {
      if (findFoodOnCart.amount === 1) {
        return;
      }
      findFoodOnCart.amount -= 1;
    }

    return this.foodOnCartRepository.save(findFoodOnCart);
  }

  remove(id: number) {
    return this.foodOnCartRepository.delete({ foodOnCartId: id });
  }
}
