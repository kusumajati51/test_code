import { ValidationArguments } from "class-validator";
import { InventoryModel } from "../entities/inventory.entity";
import { EntitySchema, FindOperator, FindOptionsWhere, ObjectType } from 'typeorm';

export interface InventoryChecking<E> extends ValidationArguments {
  constraints: [
    ObjectType<E> | EntitySchema<InventoryModel> | string,
    ((validationArguments: ValidationArguments) => FindOptionsWhere<InventoryModel>) | keyof InventoryModel,
  ];
}
