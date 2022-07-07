import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { throwError } from '../helpers';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signIn(dto: SignInDto) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: dto.email },
      });

      if (!user) {
        throw new ForbiddenException('Credentials taken');
      }

      const pwMatches = await argon.verify(user.hash, dto.password);

      if (!pwMatches) {
        throw new ForbiddenException('Credentials taken');
      }

      return await this.signToken(user.id, user.isAdmin);
    } catch (error) {
      throwError(error);
    }
  }

  async signUp(dto: SignUpDto) {
    try {
      const hash = await argon.hash(dto.password);

      const saved = await this.prisma.user.create({
        data: { email: dto.email, hash, telephone: dto.telephone },
      });

      return await this.signToken(saved.id, saved.isAdmin);
    } catch (error) {
      throwError(error);
    }
  }

  async signToken(userId: number, isAdmin: boolean) {
    const payload = {
      sub: userId,
      isAdmin,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: this.config.get('JWT_SECRET'),
    });

    return { accessToken: token };
  }
}
