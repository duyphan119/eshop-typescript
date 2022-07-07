import { throwError } from '../helpers';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductOptionDto, UpdateProductOptionDto } from './dto';

@Injectable()
export class ProductOptionService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateProductOptionDto) {
    try {
      const saved = await this.prisma.productOption.create({
        data: dto,
      });
      return saved;
    } catch (error) {
      throwError(error);
    }
  }

  async update(id: number, dto: UpdateProductOptionDto) {
    try {
      const updated = await this.prisma.productOption.update({
        data: dto,
        where: { id },
      });
      return updated;
    } catch (error) {
      throwError(error);
    }
  }

  async remove(id: number) {
    try {
      const deleted = await this.prisma.productOption.delete({ where: { id } });
      return deleted;
    } catch (error) {
      throwError(error);
    }
  }

  async getAll(query: any) {
    try {
      const { sortBy, sortType } = query;
      const items = await this.prisma.productOption.findMany({
        orderBy: [{ [sortBy || 'id']: sortType || 'desc' }],
      });
      return items;
    } catch (error) {
      throwError(error);
    }
  }
}
