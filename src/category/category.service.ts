/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { throwError } from '../helpers';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto';
import { UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    try {
      const saved = await this.prisma.category.create({
        data: dto,
      });

      return saved;
    } catch (error) {
      throwError(error);
    }
  }

  async update(id: number, dto: UpdateCategoryDto) {
    try {
      const updated = await this.prisma.category.update({
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
      const deleted = await this.prisma.category.delete({ where: { id } });
      return deleted;
    } catch (error) {
      throwError(error);
    }
  }

  async getAll(query) {
    try {
      let include = {};

      const { sortBy, sortType, depth } = query;
      if (depth) {
        switch (depth) {
          case '1':
            include = { include: { children: true } };
            break;
          case '2':
            include = {
              include: { children: { include: { children: true } } },
            };
            break;
          case '3':
            include = {
              include: {
                children: {
                  include: { children: { include: { children: true } } },
                },
              },
            };
            break;
          default:
            break;
        }
      }

      const list = await this.prisma.category.findMany({
        ...include,
        where: { parentId: null },
        orderBy: [{ [sortBy || 'id']: sortType || 'desc' }],
      });
      return list;
    } catch (error) {
      throwError(error);
    }
  }
}
