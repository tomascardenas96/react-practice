import { Food } from 'src/food/entities/food.entity';
import { FoodOnCart } from 'src/food_on_cart/entities/food_on_cart.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;

  @OneToMany(() => FoodOnCart, (foodOnCart) => foodOnCart.cart, {
    onDelete: 'CASCADE',
  })
  cart: FoodOnCart[];

  @OneToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: User;

  @OneToMany(() => Invoice, (invoice) => invoice.cart, { onDelete: 'CASCADE' })
  invoice: Invoice;
}
