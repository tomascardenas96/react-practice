import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { CartService } from 'src/cart/cart.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { FoodOnCartService } from 'src/food_on_cart/food_on_cart.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { FoodOnCart } from 'src/food_on_cart/entities/food_on_cart.entity';
import { FoodService } from 'src/food/food.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly foodOnCartService: FoodOnCartService,
    private readonly cartService: CartService,
    private readonly foodService: FoodService,
  ) {}

  //Genera la factura con los productos que esten dentro del carrito del usuario activo. A su vez tambien vacia el carrito una vez que la operacion se realice con exito.
  async generateInvoice(activeUser: ActiveUserInterface) {
    const activeCart: Cart = await this.cartService.findCartByUser(activeUser);
    const invoiceNumber = await this.generateInvoiceNumber();
    const foodsOnCart: FoodOnCart[] =
      await this.foodOnCartService.findAllByUser(activeCart);

    if (!foodsOnCart || foodsOnCart.length === 0) {
      throw new NotFoundException('No se encontraron productos en el carrito');
    }

    //Para verificar que haya stock de todos los productos.
    for (const foodOnCart of foodsOnCart) {
      const food = await this.foodService.findById(foodOnCart.food.foodId);
      console.log(food);
      const thereIsStock: boolean = food.stock - foodOnCart.amount >= 0;
      if (!thereIsStock) {
        throw new BadRequestException(
          `There are / is only ${foodOnCart.amount} of ${foodOnCart.food.description} in stock`,
        );
      }
    }

    //Agregar logica para numero de factura.
    for (const foodOnCart of foodsOnCart) {
      const newInvoice = this.invoiceRepository.create({
        invoiceNumber: invoiceNumber,
        foodId: foodOnCart.food.foodId,
        foodDescription: foodOnCart.food.description,
        foodAmount: foodOnCart.amount,
        foodUnitaryPrice: foodOnCart.food.price,
        cart: activeCart,
        foodShop: foodOnCart.food.shop,
      });
      //Para actualizar el stock.
      await this.foodService.updateStock(
        foodOnCart.food.foodId,
        foodOnCart.amount,
      );

      //Para guardar los cambios de la nueva factura
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
    return this.invoiceRepository.find({ where: { cart: activeCart } });
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
