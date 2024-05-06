import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderModel } from "./models/order.entity";
import { OrderListModel } from "./models/order_list.entity";
import { GenerateCode } from "../../helper/genereateCode";
import { CollectValueItemObjArrayByKey } from "../../helper/collectValueItemObjArrayByKey";
import OrderListSubscriber from './subscriber/order-list-subscriber';
import { InventoryCheckingValidations } from "../inventory/validator/inventory-checking-validations";
import { InventoryValidations } from "../inventory/validator/inventory.validations";

@Module({
  controllers: [OrderController],
  providers: [OrderService, GenerateCode, CollectValueItemObjArrayByKey, OrderListSubscriber, InventoryValidations],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([OrderModel, OrderListModel]),
  ],
})
export class OrderModule {}
