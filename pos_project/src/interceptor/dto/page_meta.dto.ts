import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDTOParameter } from "../../interceptor/interface/page_meta_dto_parameters.interface";

export class PageMetaDTO {
  constructor({ pageOptionsDTO, itemCount }: PageMetaDTOParameter) {
    this.page = pageOptionsDTO.page;
    this.limit = pageOptionsDTO.limit;
    this.total_rows = itemCount;
    this.total_pages = Math.ceil(this.total_rows / this.limit);
    this.has_previous_page = this.page > 1
    this.has_next_page = this.page < this.total_pages
  }
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly total_rows: number;

  @ApiProperty()
  readonly total_pages: number;

  @ApiProperty()
  readonly has_previous_page: boolean;

  @ApiProperty()
  readonly has_next_page: boolean;
}
