import { Cart } from 'src/cart/entities/cart.entity';
import { FoodOnCart } from 'src/food_on_cart/entities/food_on_cart.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  invoiceId: number;

  @Column({ nullable: false })
  invoiceNumber: string;

  @Column()
  foodId: number;

  @Column()
  foodDescription: string;

  @Column()
  foodAmount: number;

  @Column()
  foodUnitaryPrice: number;

  @ManyToOne(() => Shop)
  @JoinColumn({ name: 'foodShop' })
  foodShop: Shop;

  @ManyToOne(() => Cart, (cart) => cart.invoice, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart' })
  cart: Cart;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  emittedAt: Date;
}
