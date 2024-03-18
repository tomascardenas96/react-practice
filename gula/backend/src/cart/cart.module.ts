import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { UserModule } from 'src/user/user.module';
import { FoodModule } from 'src/food/food.module';
import { FoodOnCartModule } from 'src/food_on_cart/food_on_cart.module';

@Module({
  imports: [
    FoodOnCartModule,
    UserModule,
    FoodModule,
    TypeOrmModule.forFeature([Cart]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
