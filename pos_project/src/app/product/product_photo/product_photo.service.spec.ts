import { Test, TestingModule } from '@nestjs/testing';
import { ProductPhotoService } from './product_photo.service';

describe('PhotoService', () => {
  let service: ProductPhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductPhotoService],
    }).compile();

    service = module.get<ProductPhotoService>(ProductPhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
