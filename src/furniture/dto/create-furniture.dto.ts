import { Exclude, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFurnitureDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @Exclude()
  code?: string;

  @Exclude()
  size: string;

  @Exclude()
  brand: string;

  @Exclude()
  id: number;
}
