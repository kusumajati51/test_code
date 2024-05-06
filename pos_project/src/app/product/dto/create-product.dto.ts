import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNumber()
  stock: number;
  @ApiProperty()
  @IsNotEmpty()
  price: number;
}
