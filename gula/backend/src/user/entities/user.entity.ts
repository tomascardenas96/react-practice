import { UserPermission } from '../../common/enum/permission.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserRole } from '../../common/enum/role.enum';
import { Post } from '../../post/entities/post.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  //Select false es para que no se muestre la contraseña en el retorno.
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

  @OneToMany(() => Shop, (shop) => shop.user, { onDelete: 'CASCADE' })
  shop: Shop[];

  @OneToOne(() => Cart, (cart) => cart.user, { onDelete: 'CASCADE' })
  cart: Cart;

  @OneToOne(() => Profile, (profile) => profile.user, { onDelete: 'CASCADE' })
  profile: Profile;
}
