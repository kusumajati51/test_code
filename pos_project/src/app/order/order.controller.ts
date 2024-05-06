import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
  ParseArrayPipe,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateListOrderDto } from "./dto/create-order.dto";
import { UpdateOrderListDto } from "./dto/update-order.dto";
import { AuthGuard } from "@nestjs/passport";
import { PageOptionsDTO } from "../../interceptor/dto/page_options.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Request() req, @Body(new ParseArrayPipe({ items: CreateListOrderDto })) createOrderDto: CreateListOrderDto[]) {
    return await this.orderService.create(req.user, createOrderDto);
  }

  @Get()
  findAll(@Request() req, @Query() pageOptionsDTO: PageOptionsDTO) {
    return this.orderService.findAll(req.user, pageOptionsDTO);
  }

  @Get("/count")
  getCountingOrder(@Request() req) {
    return this.orderService.getSumOrderByProduct(req.user);
  }

  @Get("/growth/date")
  growthSalesByDate(@Request() req) {
    return this.orderService.growthSalesByDate(req.user);
  }

  @Get(":id")
  findOne(@Param("id") id, @Request() req) {
    return this.orderService.findOne(id, req.user);
  }

  @Patch(":id")
  async update(
    @Param("id") id,
    @Body() updateOrderDto: UpdateOrderListDto,
    @Request() req
  ) {
    return await this.orderService.update(req.user, id, updateOrderDto);
  }

  @Delete("list/:id")
  async removeOrderList(@Param("id") id, @Request() req) {
    return await this.orderService.removeOrderList(req.user, id);
  }
  @Delete(":id")
  async removeOrder(@Param("id") id, @Request() req) {
    return await this.orderService.removeOrder(req.user, id);
  }
}
