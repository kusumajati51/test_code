import { Injectable } from "@nestjs/common";
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";
import { ProductPhotoModel } from "../../models/product_photo.model";

@Injectable()
@EventSubscriber()
export class ProductPhotoSubscriber
  implements EntitySubscriberInterface<ProductPhotoModel>
{
  constructor(private readonly dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }
  listenTo(): string | Function {
    return ProductPhotoModel;
  }

  async beforeInsert(event: InsertEvent<ProductPhotoModel>): Promise<any> {
    await event.manager.getRepository(ProductPhotoModel).update(
      { product_id: event.entity.product_id },
      {
        is_selected: false,
      }
    );
  }
}
