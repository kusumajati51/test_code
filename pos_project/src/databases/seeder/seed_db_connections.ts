import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { UserModel } from "src/app/auth/models/user.entity";
import { InventoryModel } from "src/app/inventory/entities/inventory.entity";
import { MasterStatusInventoryModel } from "src/app/inventory/entities/master_status_inventory";
import { ReportInventoryModel } from "src/app/inventory/entities/report_inventory";
import { OrderModel } from "src/app/order/models/order.entity";
import { OrderListModel } from "src/app/order/models/order_list.entity";
import { ProductModel } from "src/app/product/models/product.entity";
import { ProductPhotoModel } from "src/app/product/models/product_photo.model";
import { SKUModel } from "src/app/product/models/sku.entity";


@Injectable()
export class SeedDatabaseConnections implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    dotenv.config();
    return {
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      autoLoadEntities: false,
      entities: [
        InventoryModel,
        ProductModel,
        UserModel,
        OrderModel,
        OrderListModel,
        SKUModel,
        ProductPhotoModel,
        ReportInventoryModel,
        MasterStatusInventoryModel,
      ],
      logger: "file",
      migrationsTableName: "typeorm_migrations",
      synchronize: false,
      migrationsRun: false,
    };
  }
}
