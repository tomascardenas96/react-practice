import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto, user: ActiveUserInterface) {
    const newPost = {
      description: createPostDto.description,
      userId: createPostDto.userId,
    };
    console.log(newPost);
    return this.postRepository.save(newPost);
  }

  findAll(req: any) {
    return this.postRepository.find({
      // where: {}
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
