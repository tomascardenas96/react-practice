import { Food } from 'src/food/entities/food.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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
  //   date: Date;
  @ManyToOne(() => User, (user) => user.post, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Food, (food) => food.post, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'post_food',
    joinColumn: {
      name: 'postId',
      referencedColumnName: 'postId',
    },
    inverseJoinColumn: {
      name: 'foodId',
      referencedColumnName: 'foodId',
    },
  })
  food: Food[];
}
