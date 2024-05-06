import { Exclude } from "class-transformer";
import { OrderListModel } from "../../order/models/order_list.entity";
import {
  BaseEntity,
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
import { ProductModel } from "./product.entity";

@Entity("sku")
export class SKUModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  unit: number;

  @Column("float8", { name: "price" })
  price: number;

  @ManyToOne(() => ProductModel, (product) => product.sku)
  @JoinColumn({ name: "product_id" })
  product: ProductModel;

  @OneToMany(() => OrderListModel, (order_list) => order_list.order)
  order_list: OrderListModel[];

  @Column()
  product_id: number;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  @Exclude()
  deleted_at: Date;
}
