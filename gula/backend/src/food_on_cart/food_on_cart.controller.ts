import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FoodOnCartService } from './food_on_cart.service';
import { UpdateFoodOnCartDto } from './dto/update-food_on_cart.dto';

@Controller('food-on-cart')
export class FoodOnCartController {
  constructor(private readonly foodOnCartService: FoodOnCartService) {}

  // @Get()
  // findAllByUser() {
  //   return this.foodOnCartService.findAllByUser();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodOnCartService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFoodOnCartDto: UpdateFoodOnCartDto,
  ) {
    return this.foodOnCartService.update(+id, updateFoodOnCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodOnCartService.remove(+id);
  }
}
