import { UserService } from './user.service';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserPermission } from 'src/common/enum/permission.enum';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';

@Auth(UserPermission.USER)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findActiveUser(@ActiveUser() activeUser: ActiveUserInterface) {
    return this.userService.findActiveUser(activeUser)
  }
}
