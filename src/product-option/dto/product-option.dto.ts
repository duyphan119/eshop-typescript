/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductOptionDto {
  @IsNumber()
  colorId: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  sizeId: number;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  amount: number;
}
export class UpdateProductOptionDto {
  @IsNumber()
  colorId: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  sizeId: number;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  amount: number;
}
