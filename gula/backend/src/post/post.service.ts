import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { UserPermission } from 'src/common/enum/permission.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly userService: UserService
  ) {}

  create(
    createPostDto: CreatePostDto,
    user: ActiveUserInterface,
  ): Promise<Post> {
    const newPost = {
      ...createPostDto,
      userId: user.userId,
    };

    return this.postRepository.save(newPost);
  }

  findAll(user: ActiveUserInterface) {
    if (user.permission === UserPermission.ADMIN) {
      return this.postRepository.find();
    }

    return this.postRepository.find({
      where: { userId: user.userId },
    });
  }

  async findPostsByProfileName(profilename: string) {
    const user = await this.userService.findByProfileName(profilename);
    if(!user) {
      throw new NotFoundException('User not found, cannot show any post');
    }

    return this.postRepository.find({where: { userId: Number(user.userId) }})
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
