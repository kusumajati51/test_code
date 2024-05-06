import { Injectable } from "@nestjs/common";
import { GenerateCode } from "../../helper/genereateCode";
import { PageDto } from "../../interceptor/dto/page.dto";
import { PageMetaDTO } from "../../interceptor/dto/page_meta.dto";
import { PageOptionsDTO } from "../../interceptor/dto/page_options.dto";
import { DataSource } from "typeorm";
import { ProductModel } from "./models/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {
  constructor(
    private dataSource: DataSource,
    private readonly generateCode: GenerateCode
  ) {}

  async create(user, createProductDto: CreateProductDto) {
    return await this.dataSource.manager.getRepository(ProductModel).save({
      name: createProductDto.name,
      code_product: this.generateCode.createProductCode(),
      user_id: user.id,
      inventory: {
        quantity: createProductDto.stock,
      },
      sku: [
        {
          name: "pieces",
          unit: 1,
          price: createProductDto.price,
        },
      ],
    });
  }

  // findAll() {
  //   return `This action returns all product`;
  // }

  async findAllByUser(user, pageOptionsDTO: PageOptionsDTO) {
    // if (instanceof pageOptionsDTO.limit === )
    var skip = (pageOptionsDTO.page - 1) * pageOptionsDTO.limit;
    if (skip == null) {
      skip = 0;
    }
    var where = {
      user_id: user.id,
      deleted_at: null,
    };
    var repo = this.dataSource.getRepository(ProductModel);
    var responseData = await repo.find({
      where: where,
      relations: {
          user: false,
          sku: true,
      },
      order: {
        [pageOptionsDTO.order_by]: pageOptionsDTO.order,
      },
      take: pageOptionsDTO.limit,
      skip,
    });

    var itemCount = await repo.count({
      where,
    });

    const pageMetaDTO = new PageMetaDTO({ itemCount, pageOptionsDTO });
    var response = new PageDto(responseData, pageMetaDTO);
    return response;
    // return data
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.dataSource
      .getRepository(ProductModel)
      .update(id, updateProductDto);
    return await this.dataSource.getRepository(ProductModel).findOne({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    return await this.dataSource
      .createQueryBuilder()
      .softDelete()
      .from(ProductModel)
      .where(`id=${id}`)
      .execute();
  }
}
