import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UserModule } from 'src/user/user.module';
import { SocketsModule } from 'src/sockets/sockets.module';
import { ShopsModule } from 'src/shops/shops.module';

@Module({
  imports: [UserModule, SocketsModule, ShopsModule, TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
