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

@Auth(UserPermission.USER)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/shop/:shopProfileName')
  create(@Body() createPostDto: CreatePostDto, @Param('shopProfileName') shopProfileName: string) {
    return this.postService.create(createPostDto, shopProfileName);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get('/shop/:shopProfileName')
  findAllByShop(
    @ActiveUser() user: ActiveUserInterface, @Param('shopProfileName') shopProfileName: string
  ) {
    return this.postService.findAllByShop(user, shopProfileName);
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
