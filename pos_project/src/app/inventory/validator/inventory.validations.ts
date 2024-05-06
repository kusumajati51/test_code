import { DataSource } from "typeorm";
import { InventoryCheckingValidations } from "./inventory-checking-validations";
import { Injectable } from "@nestjs/common";
import { ValidatorConstraint } from "class-validator";
import { InjectConnection, InjectDataSource } from "@nestjs/typeorm";

@ValidatorConstraint({ async: true })
@Injectable()
export class InventoryValidations extends InventoryCheckingValidations {
  constructor(@InjectDataSource() protected readonly dataSource: DataSource) {
    super(dataSource);
  }

}
