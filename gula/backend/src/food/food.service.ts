import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { ILike, Repository } from 'typeorm';
import { ShopsService } from 'src/shops/shops.service';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';

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
      category,
    };

    return this.foodRepository.save(newFood);
  }

  async findByFilter(filter: string) {
    const food = await this.foodRepository.find({
      where: {
        description: ILike(`%${filter}%`),
      },
      relations: ['shop'],
    });
    if (!food.length) {
      return;
    }

    return food;
  }

  async findByShop(shopName: string) {
    const food = await this.foodRepository.find({
      where: {
        shop: {
          profileName: shopName,
        },
      },
    });
    if (!food.length) {
      throw new NotFoundException("This commerce doesn't have menu yet");
    }

    return food;
  }

  async findById(foodId: number) {
    return this.foodRepository.findOne({
      where: { foodId },
      relations: ['shop'],
    });
  }

  //Para filtrar la comida por categoria.
  async findByCategory(category: string) {
    const foundCategory =
      await this.categoryService.getCategoryByName(category);
    return this.foodRepository.find({ where: { category: foundCategory } });
  }

  //Para actualizar el stock cuando se emita la factura.
  async updateStock(foodId: number, amount: number) {
    const food = await this.foodRepository.findOneBy({ foodId });
    food.stock = food.stock - amount;
    this.foodRepository.save(food);
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
