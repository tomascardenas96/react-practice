import { Cart } from 'src/cart/entities/cart.entity';
import { Food } from 'src/food/entities/food.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FoodOnCart {
  @PrimaryGeneratedColumn()
  foodOnCartId: number;

  @ManyToOne(() => Cart, (cart) => cart.cart, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'cart'
  })
  cart: Cart;

  @ManyToOne(() => Food, (food) => food.food, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'food'
  })
  food: Food;

  @Column({ default: 1 })
  amount: number;
}
