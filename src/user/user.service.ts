/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { throwError } from '../helpers';
import { PrismaService } from '../prisma/prisma.service';
import { NewPasswordDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, dto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        data: dto,
        where: { id },
      });
      const { hash, ...others } = user;
      return others;
    } catch (error) {
      throwError(error);
    }
  }
  async changePassword(id: number, dto: NewPasswordDto) {
    try {
      const checkedUser = await this.prisma.user.findFirst({ where: { id } });
      if (!checkedUser) {
        throw new ForbiddenException('Credentials taken');
      }

      const pwMatches = await argon.verify(checkedUser.hash, dto.oldPassword);
      if (!pwMatches) {
        throw new ForbiddenException('Credentials taken');
      }

      const hashedPassword = await argon.hash(dto.newPassword);
      const user = await this.prisma.user.update({
        data: { hash: hashedPassword },
        where: { id },
      });
      const { hash, ...others } = user;
      return others;
    } catch (error) {
      throwError(error);
    }
  }
}
