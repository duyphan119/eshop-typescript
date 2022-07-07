/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  slug: string;

  parentId: number | null;

  @IsString()
  sku: string;
}

export class UpdateCategoryDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  parentId: number | null;

  @IsString()
  sku: string;
}
