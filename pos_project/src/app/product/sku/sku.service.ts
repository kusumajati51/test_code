import { Injectable } from "@nestjs/common";
import { PageDto } from "../../../interceptor/dto/page.dto";
import { PageMetaDTO } from "../../../interceptor/dto/page_meta.dto";
import { PageOptionsDTO } from "../../../interceptor/dto/page_options.dto";
import { DataSource } from "typeorm";
import { SKUModel } from "../../product/models/sku.entity";
import { CreateSKUDto } from "../../product/sku/dto/create-sku.dto";
import { UpdateSKUDto } from "../../product/sku/dto/update-sku.dto";

@Injectable()
export class SKUService {
  constructor(private dataSource: DataSource) {}

  async createSku(product_id, createSku: CreateSKUDto) {
    // console.log(product_id);

    return await this.dataSource
      .getRepository(SKUModel)
      .save({ ...createSku, product_id: product_id });
  }
  async findByProductId(user, product_id, pageOptionsDTO: PageOptionsDTO) {
    var where = {
      product: {
        id: product_id,
        user_id: user.id,
      },
    };
    var skuRepo = await this.dataSource.getRepository(SKUModel);
    var responseData = await skuRepo.find({
      relations: ["product", "product.inventory"],
      where,
      order: {
        [pageOptionsDTO.order_by]: pageOptionsDTO.order,
      },
      take: pageOptionsDTO.limit,
      skip: pageOptionsDTO.skip,
    });
    var itemCount = await skuRepo.count({
      where,
    });
    const pageMetaDTO = new PageMetaDTO({ itemCount, pageOptionsDTO });
    var response = new PageDto(responseData, pageMetaDTO);

    return response;
  }

  async findAll(user, pageOptionsDTO: PageOptionsDTO) {
    var where = {
      product: {
        user_id: user.id,
      },
    };
    var skuRepo = await this.dataSource.getRepository(SKUModel);

    var responseData = await skuRepo.find({
      relations: ["product", "product.inventory"],

      where,
      order: {
        [pageOptionsDTO.order_by]: pageOptionsDTO.order,
      },
      take: pageOptionsDTO.limit,
      skip: pageOptionsDTO.skip,
    });
    var itemCount = await skuRepo.count({
      where,
    });
    const pageMetaDTO = new PageMetaDTO({ itemCount, pageOptionsDTO });
    var response = new PageDto(responseData, pageMetaDTO);
    return response;
  }

  async updateSku(id: number, updateSkuDto: UpdateSKUDto) {
    await this.dataSource.getRepository(SKUModel).update(id, updateSkuDto);
    var sku = await this.dataSource.getRepository(SKUModel).findOne({
      where: {
        id: id,
      },
    });

    return sku;
  }

  async remove(id: number) {
    return await this.dataSource
      .createQueryBuilder()
      .softDelete()
      .from(SKUModel)
      .where(`id=${id}`)
      .execute();
  }
}
