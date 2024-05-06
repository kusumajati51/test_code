import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { createReadStream } from "fs";
import { join } from "path";
import LocalFilesInterceptor from "../../../interceptor/local_files.interceptor";
import { ProductPhotoService } from "../../product/product_photo/product_photo.service";

@Controller("product/photo")
export class ProductPhotoController {
  constructor(private productPhotoService: ProductPhotoService) {}
  @Post(":product_id")
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: "file",
      path: "/product",
    })
  )
  async addProductPhoto(
    @Param("product_id") product_id: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.productPhotoService.savedPhotoProduct(product_id, {
      path: file.path,
      name: file.originalname,
      mimetype: file.mimetype,
    });
  }

  @Get(":id")
  async getFileProduct(
    @Param("id", ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response
  ) {
    const file = await this.productPhotoService.getFileById(id);
    const image = createReadStream(join(process.cwd(), file.path));
    console.log("", join(process.cwd(), file.path));
    res.set({
      "Content-Disposition": `inline; filename="${file.name}"`,
      "Content-Type": file.mimetype,
    });
    return new StreamableFile(image);
    // return res.sendFile(file.path, {root:'resource/product'})
  }

  @Get("picture/:id")
  async getPicture(
    @Param("id") id: number,
    @Res({ passthrough: true }) res: Response
  ) {
    const file = await this.productPhotoService.getProductImage(id);
    const image = createReadStream(join(process.cwd(), file.path));
    res.set({
      "Content-Disposition": `attachment; filename="${file.path}"`,
      "Content-Type": file.mimetype,
    });
    return new StreamableFile(image);
  }

  @Get("/index/:product_id")
  @UseGuards(AuthGuard("jwt"))
  async getAllPhotoProduct(
    @Param("product_id", ParseIntPipe) productID: number
  ) {
    return await this.productPhotoService.getAllPhotoProduct(productID);
  }
  @UseGuards(AuthGuard("jwt"))
  @Patch("select/:id")
  async selectFileProduct(@Param("id", ParseIntPipe) id: number) {
    return this.productPhotoService.selectPhoto(id);
  }
}
