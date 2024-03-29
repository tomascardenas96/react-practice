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
    const invoiceNumber = await this.generateInvoiceNumber();
    const foodsOnCart: FoodOnCart[] =
      await this.foodOnCartService.findAllByUser(activeCart);

    if (!foodsOnCart || foodsOnCart.length === 0) {
      throw new NotFoundException('No se encontraron productos en el carrito');
    }

    //Agregar logica para numero de factura.
    for (const foodOnCart of foodsOnCart) {
      const newInvoice = this.invoiceRepository.create({
        invoiceNumber: invoiceNumber,
        foodDescription: foodOnCart.food.description,
        foodAmount: foodOnCart.amount,
        foodUnitaryPrice: foodOnCart.food.price,
        cart: activeCart,
        foodShop: foodOnCart.food.shop,
      });
      await this.invoiceRepository.save(newInvoice);
      //Para borrar cada producto del carrito a medida que se va agregando a la factura.
      await this.foodOnCartService.removeAllOnCart(foodOnCart);
    }

    return {
      message: 'Invoice generated succesfully',
    };
  }

  //Este metodo genera un numero de factura correlativo.
  async generateInvoiceNumber() {
    const allInvoices = await this.getAll();
    let highestInvoiceNumber: number;

    // Si no hay facturas en la base de datos, comenzamos desde 1
    if (!allInvoices || allInvoices.length === 0) {
      highestInvoiceNumber = 0;
    } else {
      // Encontrar el número de factura más alto
      highestInvoiceNumber = Math.max(
        ...allInvoices.map((invoice) => {
          const invoiceNumber = parseInt(invoice.invoiceNumber.split(' ')[1]);
          return invoiceNumber;
        }),
      );
    }

    // Incrementar el número de factura más alto en 1
    const nextInvoiceNumber = highestInvoiceNumber + 1;

    // Formatear el número de factura con ceros a la izquierda
    const formattedInvoiceNumber = `C001 ${nextInvoiceNumber
      .toString()
      .padStart(8, '0')}`;

    return formattedInvoiceNumber;
  }

  getAll() {
    return this.invoiceRepository.find();
  }

  async getAllInvoicesByUser(activeUser: ActiveUserInterface) {
    const activeCart: Cart = await this.cartService.findCartByUser(activeUser);
    return this.invoiceRepository.find({ where: { cart: activeCart }});
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
