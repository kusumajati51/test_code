import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { ProductPhotoModel } from "../../product/models/product_photo.model";
import {LocalFileDto} from "./dto/local-file.entity";
@Injectable()
export class ProductPhotoService {
  constructor(private dataSource: DataSource) {}

  async savedPhotoProduct(product_id: number, fileData: LocalFileDto) {
    const newFile = await this.dataSource
      .getRepository(ProductPhotoModel)
      .create({ ...fileData, product_id: product_id });
    await this.dataSource.getRepository(ProductPhotoModel).save(newFile);
    return newFile;
  }

  async selectPhoto(id: number) {
    var product = await this.dataSource
      .getRepository(ProductPhotoModel)
      .findOne({
        where: {
          id: id,
        },
      });
    await this.dataSource.getRepository(ProductPhotoModel).update(
      { product_id: product.product_id },
      {
        is_selected: false,
      }
    );
    await this.dataSource.getRepository(ProductPhotoModel).update(
      { id: id },
      {
        is_selected: true,
      }
    );

    return product;
  }

  async getFileById(productId: number) {
    const file = await this.dataSource
      .getRepository(ProductPhotoModel)
      .findOne({
        where: {
          product_id: productId,
          is_selected: true,
        },
      });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  async getProductImage(id: number) {
    return await this.dataSource.getRepository(ProductPhotoModel).findOne({
      where: {
        id,
      },
    });
  }

  async getAllPhotoProduct(productId: number) {
    return await this.dataSource.getRepository(ProductPhotoModel).find({
      where: {
        product_id: productId,
      },
    });
  }
}
