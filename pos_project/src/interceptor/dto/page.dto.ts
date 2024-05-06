import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PageMetaDTO } from "../../interceptor/dto/page_meta.dto";

export class PageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true})
  readonly data: T[]

  @ApiProperty({type: ()=> PageMetaDTO})
  readonly meta: PageMetaDTO

  constructor(data: T[], meta: PageMetaDTO) {
    this.data = data
    this.meta = meta
  }
}