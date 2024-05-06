import { Exclude, Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserModel } from "../../auth/models/user.entity";
import { InventoryModel } from "../../inventory/entities/inventory.entity";
import { ProductPhotoModel } from "./product_photo.model";
import { SKUModel } from "./sku.entity";

@Entity("product")
export class ProductModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name" })
  name: string;

  @Expose({ name: "code_product" })
  @Column({ name: "code_product", unique: true })
  code_product: string;

  @Expose()
  @ManyToOne(() => UserModel, (user) => user.products)
  @JoinColumn({ name: "user_id" })
  user;

  @Column()
  user_id: number;

  @OneToMany(() => SKUModel, (sku) => sku.product, {
    cascade: ["insert", "update"],
  })
  sku: SKUModel[];

  @OneToMany(
    () => ProductPhotoModel,
    (product_photo) => product_photo.product,
    {
      cascade: ["insert", "update"],
    }
  )
  product_photo: ProductPhotoModel[];

  @OneToOne(() => InventoryModel, (inventory) => inventory.product, {
    cascade: ["insert", "update"],
  })
  inventory: InventoryModel;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}
