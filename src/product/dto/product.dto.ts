/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsNumber()
  price: number;

  @IsNumber()
  newPrice?: number;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsNumber()
  categoryId: number;
}

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsNumber()
  price: number;

  @IsNumber()
  newPrice?: number;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsNumber()
  categoryId: number;
}
