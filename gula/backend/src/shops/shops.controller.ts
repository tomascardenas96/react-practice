import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserPermission } from 'src/common/enum/permission.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';

@Auth(UserPermission.USER)
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  create(
    @Body() createShopDto: CreateShopDto,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return this.shopsService.create(createShopDto, user);
  }

  @Get()
  findAll() {
    return this.shopsService.findAll();
  }

  @Get('/user')
  getAllByUser(@ActiveUser() user: ActiveUserInterface) {
    return this.shopsService.getAllByUser(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(+id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopsService.remove(+id);
  }
}
