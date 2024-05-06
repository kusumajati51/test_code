import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { InventoryModel } from "./inventory.entity";
import { MasterStatusInventoryModel } from "./master_status_inventory";

@Entity("report_inventory")
export class ReportInventoryModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column("varchar", { unique: true })
  code_report: string;

  @Column()
  inventory_id: number;

  @ManyToOne(() => InventoryModel, (inventory) => inventory.report_inventory)
  @JoinColumn({ name: "inventory_id" })
  inventory;

  @Column()
  status_inventory_id: number;

  @ManyToOne(() => MasterStatusInventoryModel)
  @JoinColumn({ name: "status_inventory_id" })
  status;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}
