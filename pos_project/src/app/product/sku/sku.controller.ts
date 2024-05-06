import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PageOptionsDTO } from "../../../interceptor/dto/page_options.dto";
import { CreateSKUDto } from "../../product/sku/dto/create-sku.dto";
import { UpdateSKUDto } from "../../product/sku/dto/update-sku.dto";
import { SKUService } from "../../product/sku/sku.service";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("product/sku")
export class SKUController {
  constructor(private readonly skuService: SKUService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post(":product_id")
  async createSKU(
    @Param("product_id") product_id: number,
    @Body() createDTO: CreateSKUDto
  ) {
    return await this.skuService.createSku(product_id, createDTO);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/index/:product_id")
  async findAllBySKU(
    @Request() req,
    @Param("product_id") product_id,
    @Query() pageOptionsDTO: PageOptionsDTO
  ) {
    return await this.skuService.findByProductId(
      req.user,
      product_id,
      pageOptionsDTO
    );
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("")
  async findAllSKU(@Request() req, @Query() pageOptionsDTO: PageOptionsDTO) {
    return await this.skuService.findAll(req.user, pageOptionsDTO);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch(":id")
  async updateSku(@Param("id") id: number, @Body() updateSku: UpdateSKUDto) {
    return await this.skuService.updateSku(id, updateSku);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  async deleteSku(@Param("id") id: number) {
    return await this.skuService.remove(id);
  }
}
