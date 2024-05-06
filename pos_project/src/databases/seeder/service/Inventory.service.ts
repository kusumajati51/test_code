import { Injectable } from "@nestjs/common";
import { InventoryModel } from "src/app/inventory/entities/inventory.entity";
import { ProductModel } from "src/app/product/models/product.entity";
import { DataSource } from "typeorm";

@Injectable()
export class InventorySeed {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    var productRepo = await this.dataSource.getRepository(ProductModel);
    var product = await productRepo.find();
    var inventories = [];

    product.forEach((item) => {
      inventories.push({
        product_id: item.id,
        quantity: 1500,
      });
    });

    await this.dataSource
      .getRepository(InventoryModel)
      .upsert(inventories, ["product_id"])
      .then((r) => {
        // console.log("success");
      })
      .catch((e) => {
        console.error(e);
      });
  }
}
