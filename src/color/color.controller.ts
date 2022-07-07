import { CreateColorDto, UpdateColorDto } from './dto';
import { ColorService } from './color.service';
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

@Controller('color')
export class ColorController {
  constructor(private colorService: ColorService) {}

  @Post()
  create(@Body() dto: CreateColorDto) {
    return this.colorService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateColorDto) {
    return this.colorService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.colorService.remove(id);
  }

  @Get()
  getAll(@Query() query: any) {
    return this.colorService.getAll(query);
  }
}
