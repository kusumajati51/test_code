import { Test, TestingModule } from '@nestjs/testing';
import InventorySubscriber from './inventory-subscriber';

describe('InventorySubscriber', () => {
  let provider: InventorySubscriber;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventorySubscriber],
    }).compile();

    provider = module.get<InventorySubscriber>(InventorySubscriber);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
