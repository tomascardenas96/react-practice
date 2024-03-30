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

  @Post('upload-profile-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // Usa el nombre original del archivo con su extensión
          const uniqueSuffix = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}`;
          return cb(
            null,
            `${file.originalname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @ActiveUser() activeUser: ActiveUserInterface,
  ) {
    return this.userService.uploadFile(file, activeUser);
  }

  @Get()
  findActiveUser(@ActiveUser() activeUser: ActiveUserInterface) {
    return this.userService.findActiveUser(activeUser)
  }
}
