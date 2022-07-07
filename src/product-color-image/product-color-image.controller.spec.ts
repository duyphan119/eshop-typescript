import { Test, TestingModule } from '@nestjs/testing';
import { ProductColorImageController } from './product-color-image.controller';

describe('ProductColorImageController', () => {
  let controller: ProductColorImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductColorImageController],
    }).compile();

    controller = module.get<ProductColorImageController>(ProductColorImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
