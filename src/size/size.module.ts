import { PrismaModule } from './../prisma/prisma.module';
import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { SizeController } from './size.controller';
import { SizeService } from './size.service';

@Module({
  imports: [PrismaModule],
  controllers: [SizeController],
  providers: [SizeService, PrismaService],
})
export class SizeModule {}
