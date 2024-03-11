import { Food } from 'src/food/entities/food.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  shopId: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  phone: string;

  @Column()
  profileName: string;

  @ManyToOne(() => User, (user) => user.shop, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: User;

  @OneToMany(() => Food, (food) => food.shop, { onDelete: 'CASCADE' })
  food: Food[];
}
