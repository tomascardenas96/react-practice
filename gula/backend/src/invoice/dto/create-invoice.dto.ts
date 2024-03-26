import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FoodOnCart } from 'src/food_on_cart/entities/food_on_cart.entity';

export class CreateInvoiceDto {
  @IsString()
  invoiceNumber: string;

  @IsNotEmpty()
  order: FoodOnCart;
}
