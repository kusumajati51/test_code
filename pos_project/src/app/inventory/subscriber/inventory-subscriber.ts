import { Injectable } from '@nestjs/common';
import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { InventoryModel } from '../entities/inventory.entity';

@Injectable()
export default class InventorySubscriber implements EntitySubscriberInterface<InventoryModel> {
  constructor(private readonly dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }

  listenTo(): string | Function {
    return InventoryModel;
  }

  async afterInsert(event: InsertEvent<InventoryModel>):  Promise<any> {
    
  }
}
