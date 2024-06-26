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
import { FoodOnCartModule } from './food_on_cart/food_on_cart.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProfileModule } from './profile/profile.module';

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
    FoodOnCartModule,
    InvoiceModule,
    //Para poder acceder a una ruta estatica, como es este caso la carpeta uploads donde se guardan las fotos que suben los usuarios.
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
