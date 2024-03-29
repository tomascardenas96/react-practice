import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileService {
  uploadFile(file: any) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    console.log(file);

    return {
      message: 'File uploaded succesfully',
    };
  }
}
