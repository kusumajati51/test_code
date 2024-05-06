import { Injectable } from "@nestjs/common";
import { CollectValueItemObjArrayByKey } from "../../helper/collectValueItemObjArrayByKey";
import { GenerateCode } from "../../helper/genereateCode";
import { PageDto } from "../../interceptor/dto/page.dto";
import { PageMetaDTO } from "../../interceptor/dto/page_meta.dto";
import { PageOptionsDTO } from "../../interceptor/dto/page_options.dto";
import { DataSource, In } from "typeorm";
import { SKUModel } from "../product/models/sku.entity";
import { CreateListOrderDto } from "./dto/create-order.dto";
import { UpdateOrderListDto } from "./dto/update-order.dto";
import { OrderModel } from "./models/order.entity";
import { OrderListModel } from "./models/order_list.entity";

@Injectable()
export class OrderService {
  constructor(
    private readonly generateCode: GenerateCode,
    private readonly dataSource: DataSource,
    private readonly collect: CollectValueItemObjArrayByKey
  ) {}

  async create(user, createOrderDto: CreateListOrderDto[]) {
    var order_list = [];
    var skuRepo = await this.dataSource.getRepository(SKUModel);
    var orderRepo = await this.dataSource.getRepository(OrderModel);
    var skuCollect = await skuRepo.find({
      where: {
        id: In(this.collect.getCollect("sku_id", createOrderDto)),
      },
    });

    for (let i = 0; i < skuCollect.length; i++) {
      var orderItem = createOrderDto[i];
      var sku = skuCollect[i];
      var price = sku.price;
      order_list.push({ ...orderItem, price });
    }
    var order = {
      code_order: this.generateCode.createOrderCode(),
      user_id: user.id,
      order_list,
    };
    var responseOrder = await orderRepo.save(order);
    return {
      status: 1,
      data: responseOrder,
    };
  }

  async findAll(user, pageOptionsDTO: PageOptionsDTO) {
    var orderRepo = await this.dataSource.getRepository(OrderModel);
    var orderBuilder = orderRepo
      .createQueryBuilder("order")
        
      .where("order.user_id = :user_id", { user_id: user.id })
      .innerJoin("order.order_list", "order_list")
      .select("order.id", "id")
      .addSelect("order.code_order", "code_order")
      .addSelect(
        "sum(order_list.price * order_list.quantity )::int as total_price"
      )
      .addSelect("order.created_at", "created_at")
        .addSelect("order.updated_at", "updated_at")
        
      .orderBy(pageOptionsDTO.order_by, pageOptionsDTO.orderList)
        .groupBy("order.id")
        ;

    var itemCount = await orderBuilder.getCount();
    var responseData = await orderBuilder
      .limit(pageOptionsDTO.limit)
      .skip(pageOptionsDTO.skip)
      .getRawMany();

    const pageMetaDTO = new PageMetaDTO({ itemCount, pageOptionsDTO });
      var response = new PageDto(responseData, pageMetaDTO);
      
    return { ...response };
  }

  async getSumOrderByProduct(user) {
    var orderListRepo = await this.dataSource.getRepository(OrderListModel);
    var orderList = await orderListRepo
      .createQueryBuilder("order_list")
      .innerJoin("order_list.sku", "sku")
      .innerJoin("sku.product", "product")
      .where("product.user_id = :user_id", { user_id: user.id })
      .select("product.id", "id")
      .addSelect("product.name", "name")
      .addSelect(
        "sum(order_list.price * order_list.quantity )::int as total_all_price"
      )
      .addSelect("sum(order_list.quantity * sku.unit)::int as total_item")
      .groupBy("product.id")
      .orderBy("total_all_price", "DESC")
      .addOrderBy("total_item", "DESC")
      .getRawMany();
    return {
      status: 1,
      data: orderList,
    };
  }

  async growthSalesByDate(user) {
    var query = await this.dataSource
      .createQueryBuilder()
      .select("product_sales.id")
      .addSelect("product_sales.name")
      .addSelect("product_sales.date_sales AS date_sales")
      .addSelect("product_sales.sales")
      .addSelect("product_sales.new_sales")
      .addSelect(
        "concat(round(((product_sales.new_sales - product_sales.sales)/product_sales.sales * 100), 1), '%') AS percentage_increase_sales"
      )
      .distinctOn(["product_sales.id"])
      .from((qb) => {
        return qb
          .from(OrderListModel, "order_list")
          .innerJoin("order_list.sku", "sku")
          .innerJoin("sku.product", "product")
          .where(`product.user_id = ${user.id}`)
          .select("product.id", "id")
          .addSelect("product.name", "name")
          .addSelect("DATE(order_list.created_at) AS date_sales")
          .addSelect("SUM(order_list.quantity * sku.unit) AS sales")
          .addSelect(
            "CAST(LEAD(SUM(order_list.quantity * sku.unit)) OVER (PARTITION BY product.id ORDER BY DATE(order_list.created_at) )as numeric) AS new_sales"
          )
          .groupBy("date(order_list.created_at)")
          .addGroupBy("product.id")
          .orderBy("product.id", "ASC")
          .addOrderBy("DATE(order_list.created_at)", "ASC");
      }, "product_sales")
      .orderBy("product_sales.id", "ASC")
      .where("product_sales.new_sales IS NOT NULL")
      .addOrderBy("date_sales", "DESC");

    var getShow = await this.dataSource
      .createQueryBuilder()
      .from(`(${query.getQuery()})`, "res")
      .orderBy("res.percentage_increase_sales", "DESC")
      .getRawMany();

    return getShow;
  }

  findOne(user, id: string) {
    return `This action returns a #${id} order`;
  }

  async update(user, id: number, updateOrderDto: UpdateOrderListDto) {
    var orderListRepo = await this.dataSource.getRepository(OrderListModel);
    await orderListRepo.update(
      {
        id: id,
        sku: {
          id: updateOrderDto.sku_id,
          product: {
            user_id: user.id,
          },
        },
      },
      {
        quantity: updateOrderDto.quantity,
      }
    );

    var responseUpdate = await orderListRepo.findOne({
      where: {
        id: id,
        sku: {
          id: updateOrderDto.sku_id,
          product: {
            user_id: user.id,
          },
        },
      },
    });
    return {
      status: 1,
      data: responseUpdate,
    };
  }

  async removeOrderList(user, id: number) {
    var orderListRepo = await this.dataSource.getRepository(OrderListModel);
    var orderList = await orderListRepo.findOne({
      where: {
        id: id,
        sku: {
          product: {
            user_id: user.id,
          },
        },
      },
    });
    await orderListRepo.softDelete({
      id: id,
      sku: {
        id: orderList.sku_id,
        product: {
          user_id: user.id,
        },
      },
    });
    return {
      status: 1,
      messages: "Delete Success",
      data: orderList,
    };
  }

  async removeOrder(user, id: number) {
    var orderRepo = await this.dataSource.getRepository(OrderModel);
    var order = await orderRepo.findOne({
      where: {
        id: id,
        user_id: user.id,
      },
    });

    await orderRepo.softDelete({
      id: id,
      user_id: user.id,
    });

    return {
      status: 1,
      messages: "Delete Success",
      data: order,
    };
  }
}
