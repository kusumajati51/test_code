import { IsNotEmpty, Validate } from "class-validator";
import { InventoryCheckingValidations } from "../../inventory/validator/inventory-checking-validations";
import { InventoryValidations } from "../../inventory/validator/inventory.validations";

export class CreateListOrderDto {
  @IsNotEmpty()
  sku_id: number;
  @Validate(InventoryValidations, ["sku_id"])
  quantity: number;
}

