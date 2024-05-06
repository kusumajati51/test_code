import { PartialType } from "@nestjs/mapped-types";
import { CreateSKUDto } from "./create-sku.dto";

export class UpdateSKUDto extends PartialType(CreateSKUDto) {}
