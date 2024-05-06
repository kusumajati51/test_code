import { Test, TestingModule } from '@nestjs/testing';
import { ProductPhotoController } from './product_photo.controller';

describe('PhotoController', () => {
  let controller: ProductPhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductPhotoController],
    }).compile();

    controller = module.get<ProductPhotoController>(ProductPhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
