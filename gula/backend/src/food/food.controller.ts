import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserPermission } from 'src/common/enum/permission.enum';
import { Category } from 'src/category/entities/category.entity';

@Auth(UserPermission.USER)
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.create(createFoodDto);
  }

  @Get('/filter/:filter')
  findByFilter(@Param('filter') filter: string) {
    return this.foodService.findByFilter(filter);
  }

  @Get('/shop/:shopName')
  findByShop(@Param('shopName') shopName: string) {
    return this.foodService.findByShop(shopName);
  }

  @Get('/filter/category/:category')
  findByCategory(@Param('category') category: string) {
    return this.foodService.findByCategory(category)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodService.update(+id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(+id);
  }
}
