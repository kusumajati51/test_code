import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ProductModel } from "../../product/models/product.entity";
import { Exclude } from "class-transformer";
import { IsEmail } from "class-validator";
import { OrderModel } from "../../order/models/order.entity";
@Entity("users")
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    name: "phone_number"
  })
  phoneNumber: string;

  @Column({
    type: "varchar",
    enum: ["male", "female"],
    nullable: false
  })
  gender: string;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ProductModel, (product) => product.user)
  products: ProductModel[];

  @OneToMany(() => OrderModel, (order) => order.user)
  order: OrderModel[];
}
