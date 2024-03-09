import { Food } from 'src/food/entities/food.entity';
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
  name: string;

  @Column({ nullable: false })
  description: string;
  @ManyToOne(() => User, (user) => user.userId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  userId: number;

}
