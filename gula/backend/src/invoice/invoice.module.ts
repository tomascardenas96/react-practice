import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { CartModule } from 'src/cart/cart.module';
import { FoodOnCartModule } from 'src/food_on_cart/food_on_cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]), CartModule, FoodOnCartModule],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
