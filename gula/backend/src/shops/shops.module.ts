import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), UserModule],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [ShopsService]
})
export class ShopsModule {}
