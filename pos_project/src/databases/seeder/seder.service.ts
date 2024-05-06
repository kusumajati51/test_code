import { Injectable } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { InventorySeed } from "./service/Inventory.service";
import { MasterInventorySeed } from "./service/master_inventory.service";
import { UserServiceSeed } from "./service/User.service";
import { ProductSeed } from "./service/product.service";

@Injectable()
export class SeederService {
  constructor(
    private readonly logger: Logger,
    private readonly inventory: InventorySeed,
    private readonly masterInventory: MasterInventorySeed,
    private readonly user: UserServiceSeed,
    private readonly product: ProductSeed
  ) {}
  async seed() {
    await this.user.seed();
    await this.product.seed();
    await this.inventory.seed();
    await this.masterInventory.seed();
  }
}
