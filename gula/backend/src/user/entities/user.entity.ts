import { UserPermission } from './permission.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserRole } from './role.enum';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({
    type: 'enum',
    default: UserRole.CUSTOMER,
    enum: UserRole,
    nullable: false,
  })
  role: UserRole[];

  @Column({
    type: 'enum',
    default: UserPermission.USER,
    enum: UserPermission,
    nullable: false,
  })
  permission: UserPermission;

  @OneToMany(()=> Post, (post) => post.user, {onDelete: 'CASCADE'})
  post: Post[];
}
