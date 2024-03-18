import { IsNumber, IsString } from 'class-validator';
import { Cart } from 'src/cart/entities/cart.entity';
import { Food } from 'src/food/entities/food.entity';

export class CreateFoodOnCartDto {
  @IsString()
  food: string;
  @IsNumber()
  amount: number;
}
