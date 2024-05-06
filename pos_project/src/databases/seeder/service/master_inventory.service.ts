import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { MasterStatusInventoryModel } from "../../../app/inventory/entities/master_status_inventory";

@Injectable()
export class MasterInventorySeed {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    await this.dataSource.getRepository(MasterStatusInventoryModel).upsert(
      [
        {
          id: 1,
          name: "Buy Item",
          status_inventory: true,
        },
        {
          id: 2,
          name: "Sale Item",
          status_inventory: false,
        },
        {
          id: 3,
          name: "Return Item",
          status_inventory: true,
        },
      ],
      ["id"]
    );
  }
}
