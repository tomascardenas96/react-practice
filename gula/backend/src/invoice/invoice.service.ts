import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { CartService } from 'src/cart/cart.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { FoodOnCartService } from 'src/food_on_cart/food_on_cart.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { FoodOnCart } from 'src/food_on_cart/entities/food_on_cart.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly foodOnCartService: FoodOnCartService,
    private readonly cartService: CartService,
  ) {}

  async generateInvoice(activeUser: ActiveUserInterface) {
    const activeCart: Cart = await this.cartService.findCartByUser(activeUser);
    const foodsOnCart: FoodOnCart[] =
      await this.foodOnCartService.findAllByUser(activeCart);

    if (!foodsOnCart || foodsOnCart.length === 0) {
      throw new NotFoundException('No se encontraron productos en el carrito');
    }

    //Agregar logica para numero de factura.
    for (const foodOnCart of foodsOnCart) {
      const newInvoice = this.invoiceRepository.create({
        foodDescription: foodOnCart.food.description,
        foodAmount: foodOnCart.amount,
        foodUnitaryPrice: foodOnCart.food.price,
        cart: activeCart,
        foodShop: foodOnCart.food.shop,
      });
      await this.invoiceRepository.save(newInvoice);
    }

    return {
      message: 'Invoice generated succesfully'
    }
  }

  findAll() {
    return `This action returns all invoice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
