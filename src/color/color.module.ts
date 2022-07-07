import { PrismaService } from '../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';

@Module({
  imports: [PrismaModule],
  controllers: [ColorController],
  providers: [ColorService, PrismaService],
})
export class ColorModule {}
