import { Test, TestingModule } from '@nestjs/testing';
import OrderListSubscriber from './order-list-subscriber';

describe('OrderSubscriber', () => {
  let provider: OrderListSubscriber;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderListSubscriber],
    }).compile();

    provider = module.get<OrderListSubscriber>(OrderListSubscriber);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
