import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderListModel } from "./order_list.entity";
import { Expose } from "class-transformer";
import { UserModel } from "../../auth/models/user.entity";

@Entity("order")
export class OrderModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code_order: string;

  @OneToMany(() => OrderListModel, (order_list) => order_list.order, {
    cascade: ["insert", "update"],
  })
  order_list: OrderListModel[];

  @Expose()
  @ManyToOne(() => UserModel, (user) => user.order)
  @JoinColumn({ name: "user_id" })
  user;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
