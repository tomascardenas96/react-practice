import { Food } from 'src/food/entities/food.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column({ nullable: false })
  description: string;

  @Column({nullable: false})
  icon: string;

  @OneToMany(()=> Food, (food)=> food.category, { onDelete: 'CASCADE' })
  food: Food[];
}
