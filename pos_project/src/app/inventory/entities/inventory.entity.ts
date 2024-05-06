import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ReportInventoryModel } from "./report_inventory";
import { ProductModel } from "../../product/models/product.entity";

@Entity("inventory")
export class InventoryModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({name:"product_id", unique: true})
  product_id: number;
  
  @OneToOne(()=>ProductModel, (product) =>product.inventory)
  @JoinColumn({name: "product_id"})
  product

  @OneToMany(()=>ReportInventoryModel, (report_inventory) =>report_inventory.inventory)
  report_inventory

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}
