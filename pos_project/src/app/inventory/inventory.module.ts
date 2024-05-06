import { Module } from "@nestjs/common";
import { StorageService } from "./inventory.service";
import { StorageController } from "./inventory.controller";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MasterStatusInventoryModel } from "./entities/master_status_inventory";
import { InventoryModel } from "./entities/inventory.entity";
import { ReportInventoryModel } from "./entities/report_inventory";
import InventorySubscriber from './subscriber/inventory-subscriber';
import { InventoryCheckingValidations } from "./validator/inventory-checking-validations";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([MasterStatusInventoryModel, InventoryModel, ReportInventoryModel]),
  ],
  controllers: [StorageController],
  providers: [StorageService],
  exports:[TypeOrmModule]
})
export class InventoryModule {}
