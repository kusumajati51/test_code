import { Injectable } from "@nestjs/common";
import { ProductModel } from "src/app/product/models/product.entity";
import { DataSource } from "typeorm";

@Injectable()
export class ProductSeed {
  constructor(private readonly dataSource: DataSource) {}
  async seed() {
    await this.dataSource.getRepository(ProductModel).upsert(
      [
        {
          id: 1,
          name: "Cadbury",
          code_product: "ZYC9747DN",
          user_id: 1,
          sku: [
            {
              name: "pieces",
              price: 2000,
              unit: 1,
            },
          ],
          product_photo: [
            {
              name: "cadbury-f43f.jpeg",
              path: "resource/product/cadbury-f43f.jpeg",
              is_selected: true,
            },
          ],
          inventory: {
            quantity: 10000,
          },
        },
        {
          id: 2,
          name: "Gudang Garam Filter",
          code_product: "QMW4521XQ",
          user_id: 1,
          sku: [
            {
              name: "pieces",
              price: 2000,
              unit: 1,
            },
          ],
          product_photo: [
            {
              name: "gudang_garam.jpeg",
              path: "resource/product/gudang_garam-b168.jpeg",
              is_selected: true,
            },
          ],
          inventory: {
            quantity: 10000,
          },
        },
        {
          id: 3,
          name: "Oreo",
          code_product: "QMW4521XQ",
          user_id: 1,
          sku: [
            {
              name: "pieces",
              price: 2000,
              unit: 1,
            },
          ],
          product_photo: [
            {
              name: "oreo.jpeg",
              path: "resource/product/oreo-1fc9.jpeg",
              is_selected: true,
            },
          ],
          inventory: {
            quantity: 10000,
          },
        },
      ],
      ["id"]
    );
  }
}
