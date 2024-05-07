import { ItemType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { CreateFurnitureDto } from 'src/furniture/dto/create-furniture.dto';
import { CreateToolDto } from 'src/tool/dto/create-tool.dto';
import { CreateUniformDto } from 'src/uniform/dto/create-uniform.dto';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  sectionId: string;

  @IsEnum(ItemType, {
    message: `Possible values are: ${Object.values(ItemType).join(', ')}`,
  })
  @IsOptional()
  type: ItemType = ItemType.TOOL;

  @IsOptional()
  itemData: CreateUniformDto | CreateToolDto | CreateFurnitureDto;
}
