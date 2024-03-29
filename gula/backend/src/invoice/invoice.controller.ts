import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserPermission } from 'src/common/enum/permission.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { FoodOnCart } from 'src/food_on_cart/entities/food_on_cart.entity';

@Auth(UserPermission.USER)
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@ActiveUser() activeUser: ActiveUserInterface) {
    return this.invoiceService.generateInvoice(activeUser);
  }

  @Get()
  getAllInvoicesByUser(@ActiveUser() activeUser: ActiveUserInterface) {
    return this.invoiceService.getAllInvoicesByUser(activeUser);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.invoiceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
  //   return this.invoiceService.update(+id, updateInvoiceDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }
}
