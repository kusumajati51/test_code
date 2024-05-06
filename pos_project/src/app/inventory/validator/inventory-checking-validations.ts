import { plainToClass } from "class-transformer";
import {
  ValidationArguments,
  ValidatorConstraintInterface,
} from "class-validator";
import { SKUModel } from "../../product/models/sku.entity";
import { DataSource } from "typeorm";

export abstract class InventoryCheckingValidations
  implements ValidatorConstraintInterface
{
  messages: string;
  constructor(protected readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const dtoClass = args.object.constructor as new () => any; // <-- explicit type annotation
    const dto = plainToClass(dtoClass, args.object as Record<string, any>);
    const [field] = args.constraints;
    var skuRepository = await this.dataSource.getRepository(SKUModel);
    const sku = await skuRepository.findOne({
      relations: ["product", "product.inventory"],
      where: {
        id: dto[field],
      },
    });
    if (!sku) {
      this.messages = `sku_id ${dto[field]} not found`;
      return false;
    }
    if (sku.product.inventory.quantity < value * sku.unit) {
      this.messages = `${sku.product.name} has insufficient balance`;
      return false;
    }
    return true;
  }
  defaultMessage?(args?: ValidationArguments): string {
    return this.messages;
  }
}
