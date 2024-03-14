import { Food } from 'src/food/entities/food.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column({ nullable: false })
  description: string;
  
  @ManyToOne(() => Shop, (shop) => shop.post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop' })
  shop: Shop;

}
