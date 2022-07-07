import { Module } from '@nestjs/common';
import { ProductColorImageController } from './product-color-image.controller';
import { ProductColorImageService } from './product-color-image.service';

@Module({
  controllers: [ProductColorImageController],
  providers: [ProductColorImageService]
})
export class ProductColorImageModule {}
