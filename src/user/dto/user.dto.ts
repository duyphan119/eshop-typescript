/* eslint-disable prettier/prettier */
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  @Length(10)
  telephone?: string;

  fullName?: string;

  city?: string;

  district?: string;

  ward?: string;

  address?: string;

  @IsBoolean()
  isAdmin?: boolean;
}

export class NewPasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
