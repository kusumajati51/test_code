import { Test, TestingModule } from '@nestjs/testing';
import { SKUController } from './sku.controller';

describe('SkuController', () => {
  let controller: SKUController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SKUController],
    }).compile();

    controller = module.get<SKUController>(SKUController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
