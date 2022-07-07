import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { throwError } from '../helpers';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateProductDto) {
    try {
      const saved = await this.prisma.product.create({
        data: dto,
      });
      return saved;
    } catch (error) {
      throwError(error);
    }
  }

  async update(id: number, dto: UpdateProductDto) {
    try {
      const updated = await this.prisma.product.update({
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
      const deleted = await this.prisma.product.delete({ where: { id } });
      return deleted;
    } catch (error) {
      throwError(error);
    }
  }

  async getAll(query: any) {
    try {
      const { sortBy, sortType } = query;
      const items = await this.prisma.product.findMany({
        include: { category: true },
        orderBy: [{ [sortBy || 'id']: sortType || 'desc' }],
      });
      return items;
    } catch (error) {
      throwError(error);
    }
  }
}
