import bcrypt from 'bcrypt';
import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from 'typeorm'
import { IsNotEmpty, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  static async comparePassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column({
    name: 'first_name',
    length: 128,
  })
  firstName!: string;

  @IsNotEmpty()
  @Column({
    name: 'last_name',
    length: 128,
  })
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  @Column({
    length: 128,
    unique: true,
  })
  email!: string;

  @IsNotEmpty()
  @Column({
    length: 80,
  })
  @Exclude({toPlainOnly: true})
  password!: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await User.hashPassword(this.password);
  }
}
