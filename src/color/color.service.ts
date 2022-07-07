import { throwError } from '../helpers';
import { CreateColorDto, UpdateColorDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateColorDto) {
    try {
      const saved = await this.prisma.color.create({
        data: dto,
      });
      return saved;
    } catch (error) {
      throwError(error);
    }
  }

  async update(id: number, dto: UpdateColorDto) {
    try {
      const updated = await this.prisma.color.update({
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
      const deleted = await this.prisma.color.delete({ where: { id } });
      return deleted;
    } catch (error) {
      throwError(error);
    }
  }

  async getAll(query: any) {
    try {
      const { sortBy, sortType } = query;
      const items = await this.prisma.color.findMany({
        orderBy: [{ [sortBy || 'id']: sortType || 'desc' }],
      });
      return items;
    } catch (error) {
      throwError(error);
    }
  }
}
