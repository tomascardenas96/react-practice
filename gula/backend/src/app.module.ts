import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { FoodModule } from './food/food.module';
import { SocketsModule } from './sockets/sockets.module';
import { ShopsModule } from './shops/shops.module';
import { CartModule } from './cart/cart.module';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'gula',
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    }),
    AuthModule,
    PostModule,
    CategoryModule,
    FoodModule,
    SocketsModule,
    ShopsModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
