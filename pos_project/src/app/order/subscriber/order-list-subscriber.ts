import { Injectable } from "@nestjs/common";
import { GenerateCode } from "../../../helper/genereateCode";
import { DataSource, EntitySubscriberInterface, InsertEvent } from "typeorm";
import { InventoryModel } from "../../inventory/entities/inventory.entity";
import { ReportInventoryModel } from "../../inventory/entities/report_inventory";
import { SKUModel } from "../../product/models/sku.entity";
import { OrderListModel } from "../models/order_list.entity";

@Injectable()
export default class OrderListSubscriber
  implements EntitySubscriberInterface<OrderListModel>
{
  constructor(
    private readonly dataSource: DataSource,
    private readonly generaTeCode: GenerateCode
  ) {
    this.dataSource.subscribers.push(this);
  }

  listenTo(): string | Function {
    return OrderListModel;
  }

  async afterInsert(event: InsertEvent<OrderListModel>): Promise<any> {
    var sku = await event.manager
      .getRepository(SKUModel)
      .findOne({ where: { id: event.entity.sku_id } });
    var total_item = event.entity.quantity * sku.unit;
    var inventoryGet = await event.manager
      .getRepository(InventoryModel)
      .createQueryBuilder()
      .where(`product_id = ${sku.product_id}`);

    var inventory = await inventoryGet.getOne();

    await event.manager.getRepository(InventoryModel).update(
      {
        id: inventory.id,
      },
      {
        quantity: inventory.quantity - total_item,
      }
    );
    var report = await event.manager
      .getRepository(ReportInventoryModel)
      .insert({
        code_report: this.generaTeCode.createOrderCode(),
        quantity: total_item,
        inventory_id: inventory.id,
        status_inventory_id: 2,
      });
  }
}
