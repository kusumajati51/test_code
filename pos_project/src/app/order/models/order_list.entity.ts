import { SKUModel } from "../../product/models/sku.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderModel } from "./order.entity";

@Entity("order_list")
export class OrderListModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ name: "order_id" })
  order_id: number;

  @Column()
  price: number;

  @ManyToOne(() => OrderModel, (order) => order.order_list)
  @JoinColumn({ name: "order_id" })
  order: OrderModel;

  @Column({ name: "sku_id" })
  sku_id: number;

  @ManyToOne(() => SKUModel, (sku) => sku.order_list)
  @JoinColumn({ name: "sku_id" })
  sku: SKUModel;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
