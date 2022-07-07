import { PrismaService } from './../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ProductOptionController } from './product-option.controller';
import { ProductOptionService } from './product-option.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductOptionController],
  providers: [ProductOptionService, PrismaService],
})
export class ProductOptionModule {}
