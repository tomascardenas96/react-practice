import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FoodOnCartService } from './food_on_cart.service';
import AddOrSubstractDto from './dto/add-or-substract.dto';

@Controller('food-on-cart')
export class FoodOnCartController {
  constructor(private readonly foodOnCartService: FoodOnCartService) {}

  @Patch('/modifyamount/:id')
  addOrSubstractAmount(
    @Param('id', ParseIntPipe) id: number,
    @Body() addOrSubstractDto: AddOrSubstractDto,
  ) {
    return this.foodOnCartService.addOrSubstractAmount(id, addOrSubstractDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.foodOnCartService.remove(id);
  }
}
