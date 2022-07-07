import { CreateSizeDto, UpdateSizeDto } from './dto';
import { SizeService } from './size.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('size')
export class SizeController {
  constructor(private sizeService: SizeService) {}

  @Post()
  create(@Body() dto: CreateSizeDto) {
    return this.sizeService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSizeDto) {
    return this.sizeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sizeService.remove(id);
  }

  @Get()
  getAll(@Query() query: any) {
    return this.sizeService.getAll(query);
  }
}
