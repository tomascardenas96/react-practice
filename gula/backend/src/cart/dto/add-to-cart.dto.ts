import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddToCartDto {
  @IsNumber()
  @IsNotEmpty()
  food: number;

}
