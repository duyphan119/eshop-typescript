import { throwError } from './../helpers/throw-error.helper';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSizeDto, UpdateSizeDto } from './dto';

@Injectable()
export class SizeService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateSizeDto) {
    try {
      const saved = await this.prisma.size.create({
        data: dto,
      });
      return saved;
    } catch (error) {
      throwError(error);
    }
  }

  async update(id: number, dto: UpdateSizeDto) {
    try {
      const updated = await this.prisma.size.update({
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
      const deleted = await this.prisma.size.delete({ where: { id } });
      return deleted;
    } catch (error) {
      throwError(error);
    }
  }

  async getAll(query: any) {
    try {
      const { sortBy, sortType } = query;
      const items = await this.prisma.size.findMany({
        orderBy: [{ [sortBy || 'id']: sortType || 'desc' }],
      });
      return items;
    } catch (error) {
      throwError(error);
    }
  }
}
