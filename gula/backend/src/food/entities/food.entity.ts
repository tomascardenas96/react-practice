import { Cart } from 'src/cart/entities/cart.entity';
import { Category } from 'src/category/entities/category.entity';
import { FoodOnCart } from 'src/food_on_cart/entities/food_on_cart.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  foodId: number;

  @Column({ nullable: false })
  description: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @ManyToOne(() => Category, (category) => category.food, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category' })
  category: Category;

  @ManyToOne(() => Shop, (shop) => shop.food, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'shop',
  })
  shop: Shop;

  @OneToMany(() => FoodOnCart, (foodOnCart) => foodOnCart.food, {
    onDelete: 'CASCADE',
  })
  food: FoodOnCart[];
}
