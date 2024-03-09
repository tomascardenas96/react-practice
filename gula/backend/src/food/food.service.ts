import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Repository } from 'typeorm';
import { ShopsService } from 'src/shops/shops.service';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food) private readonly foodRepository: Repository<Food>,
    private readonly shopService: ShopsService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createFoodDto: CreateFoodDto): Promise<Food> {
    const shop = await this.shopService.getShopByName(createFoodDto.shop);
    const category = await this.categoryService.getCategoryByName(
      createFoodDto.category,
    );
    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const newFood = {
      ...createFoodDto,
      shop,
      category
    };

    return this.foodRepository.save(newFood);
  }

  findAll() {
    return `This action returns all food`;
  }

  findOne(id: number) {
    return `This action returns a #${id} food`;
  }

  update(id: number, updateFoodDto: UpdateFoodDto) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
