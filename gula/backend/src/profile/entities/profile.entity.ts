import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  profileId: number;

  @Column()
  profileName: string;

  @Column({ default: 'c0749b7cc401421662ae901ec8f9f660.jpg' })
  profilepicture: string;

  @Column({ default: null })
  coverphoto: string;

  @Column({ default: null })
  location: string;

  @Column({ default: null })
  birthdate: Date;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: User;
}
