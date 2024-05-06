import { Exclude } from "class-transformer";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ProductModel } from "./product.entity";

@Entity({ name: "product_photo", schema: "resource" })
export class ProductPhotoModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column({ name: "is_selected", default: true })
  is_selected: boolean;

  @ManyToOne(() => ProductModel, (product) => product.product_photo)
  @JoinColumn({ name: "product_id" })
  product: ProductModel;

  @Column({ name: "product_id" })
  product_id: number;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  mimetype: string;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}
