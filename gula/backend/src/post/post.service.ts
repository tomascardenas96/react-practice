import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { UserPermission } from 'src/common/enum/permission.enum';
import { UserService } from 'src/user/user.service';
import { SocketsService } from 'src/sockets/sockets.service';
import { ShopsService } from 'src/shops/shops.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly userService: UserService,
    private readonly shopService: ShopsService,
    private readonly socketsService: SocketsService,
  ) {}

  async create(createPostDto: CreatePostDto, shopProfileName: string): Promise<Post> {
    const shop = await this.shopService.getShopByProfileName(shopProfileName);
    if (!shop) {
      throw new NotFoundException('Shop non-existent');
    }

    const newPost = {
      ...createPostDto,
      shop: shop,
    };
    const post = await this.postRepository.save(newPost);

    this.socketsService.emitirEventoNuevaPublicacion(post);

    return post;
  }

  findAll() {
    return this.postRepository.find({ relations: ['shop'] });
  }

  async findAllByShop(user: ActiveUserInterface, shopProfileName: string) {
    if (user.permission === UserPermission.ADMIN) {
      return this.postRepository.find();
    }

    const shop = await this.shopService.getShopByProfileName(shopProfileName);
    if (!shop) {
      throw new NotFoundException('Shop non-existent');
    }

    return this.postRepository.find({
      where: { shop },
      relations: ['shop'],
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
