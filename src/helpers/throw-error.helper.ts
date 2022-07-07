/* eslint-disable prettier/prettier */
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException } from '@nestjs/common';

export const throwError = (error) => {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      throw new ForbiddenException('Credentials taken');
    }
  }
  throw error;
};
