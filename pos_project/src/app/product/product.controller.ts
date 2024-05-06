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
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PageOptionsDTO } from "../../interceptor/dto/page_options.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard("jwt"))
  // @UseInterceptors(ClassSerializerInterceptor)
  @Post("")
  async createProduct(
    @Request() req,
    @Body(new ValidationPipe({ transform: true }))
    createProductDto: CreateProductDto
  ) {
    return await this.productService.create(req.user, createProductDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get("")
  async findProduct(@Request() req, @Query() pageOptionsDTO: PageOptionsDTO) {
    var response = await this.productService.findAllByUser(
      req.user,
      pageOptionsDTO
    );
    return response;
  }

  @UseGuards(AuthGuard("jwt"))
  // @UseInterceptors(ClassSerializerInterceptor)
  @Patch(":id")
  async updateProduct(
    @Param("id") id: number,
    @Request() req,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return await this.productService.update(id, updateProductDto);
  }

  @UseGuards(AuthGuard("jwt"))
  // @UseInterceptors(ClassSerializerInterceptor)
  @Delete(":id")
  async deleteProduct(@Param("id") id: number) {
    return await this.productService.remove(id);
  }
}
