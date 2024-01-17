import { Category } from 'src/category/entities/category.entity';
import { Post } from 'src/post/entities/post.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
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

  @ManyToMany(() => Post, (post) => post.food, { onDelete: 'CASCADE' })
  post: Post[];

  @ManyToOne(() => Category, (category) => category.food, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
