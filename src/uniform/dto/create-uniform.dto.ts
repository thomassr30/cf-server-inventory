import { Exclude, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUniformDto {
  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  size: string;

  @IsString()
  @IsOptional()
  brand: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @Exclude()
  id: number;
}
