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
import { CreateProductOptionDto, UpdateProductOptionDto } from './dto';
import { ProductOptionService } from './product-option.service';
@Controller('product-option')
export class ProductOptionController {
  constructor(private productOptionService: ProductOptionService) {}

  @Post()
  create(@Body() dto: CreateProductOptionDto) {
    return this.productOptionService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductOptionDto,
  ) {
    return this.productOptionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productOptionService.remove(id);
  }

  @Get()
  getAll(@Query() query: any) {
    return this.productOptionService.getAll(query);
  }
}
