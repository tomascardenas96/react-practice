import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { User } from 'src/user/entities/user.entity';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserPermission } from 'src/common/enum/permission.enum';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';

@Auth(UserPermission.USER)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('addtocart')
  addFoodOnCart(
    @Body() addToCart: AddToCartDto,
    @ActiveUser() activeUser: ActiveUserInterface,
  ) {
    return this.cartService.addFoodOnCart(addToCart, activeUser);
  }

  @Get('cartbyuser')
  findAllByUser(@ActiveUser() user: ActiveUserInterface) {
    return this.cartService.findAllByUser(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
