import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GenerateCode } from "../../helper/genereateCode";
import { SKUModel } from "./models/sku.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { ProductPhotoController } from "./product_photo/product_photo.controller";
import { ProductPhotoService } from "./product_photo/product_photo.service";
import { SKUController } from "./sku/sku.controller";
import { ProductModel } from "./models/product.entity";
import { ProductPhotoModel } from "./models/product_photo.model";
import { ProductPhotoSubscriber } from "./product_photo/subscriber/product_photo.subscriber";
import { SKUService } from "./sku/sku.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([ProductModel, SKUModel, ProductPhotoModel]),
  ],
  controllers: [ProductController, SKUController, ProductPhotoController],
  providers: [
    ProductService,
    SKUService,
    ProductPhotoService,
    ProductPhotoSubscriber,
    GenerateCode,
  ],
  exports: [TypeOrmModule],
})
export class ProductModule {}
