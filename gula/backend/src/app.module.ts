import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { FoodModule } from './food/food.module';
// import { MulterModule } from '@nestjs/platform-express';
import { SocketsModule } from './sockets/sockets.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
