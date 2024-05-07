import { Exclude, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateToolDto {
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
  @Type(() => Number)
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
