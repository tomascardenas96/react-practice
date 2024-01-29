import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserPermission } from 'src/common/enum/permission.enum';
import { Auth } from 'src/common/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Auth(UserPermission.USER)
  create(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return this.postService.create(createPostDto, user);
  }

  @Get()
  @Auth(UserPermission.USER)
  findAll(@ActiveUser() user: ActiveUserInterface) {
    return this.postService.findAll(user);
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
