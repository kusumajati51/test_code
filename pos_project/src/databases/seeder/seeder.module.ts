import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryModel } from "../../app/inventory/entities/inventory.entity";
import { MasterStatusInventoryModel } from "../../app/inventory/entities/master_status_inventory";
import { ProductModel } from "../../app/product/models/product.entity";
import { SeederService } from "./seder.service";
import { SeederDatabaseProviderModule } from "./seeder.database";
import { InventorySeed } from "./service/Inventory.service";
import { MasterInventorySeed } from "./service/master_inventory.service";

@Module({
  imports: [
    SeederDatabaseProviderModule,
    TypeOrmModule.forFeature([
      InventoryModel,
      ProductModel,
      MasterStatusInventoryModel,
      // UserModel,
      // OrderModel,
      // OrderListModel,
      // SKUModel,
      // ProductPhotoModel,
      // ReportInventoryModel,
    ]),
  ],
  providers: [Logger, SeederService, InventorySeed, MasterInventorySeed],
})
export class SeederModule {}
