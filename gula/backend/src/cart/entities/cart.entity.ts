import { Food } from 'src/food/entities/food.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;

  @Column()
  total: number;

  @ManyToMany(() => Food, (food) => food.cart, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinTable({
    name: 'cart_food',
    joinColumn: {
        name: 'cart',
        referencedColumnName: 'cartId'
    },
    inverseJoinColumn: {
        name: 'food',
        referencedColumnName: 'foodId'
    }
  })
  food: Food[];

  @OneToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: User;
}
