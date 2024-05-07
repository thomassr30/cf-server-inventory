import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from '@prisma/client';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get('sectionId/:id')
  findAll(@Param('id') id: string) {
    return this.itemService.findAll(id);
  }

  @Get('section/:id')
  findAllBySection(
    @Param('id') id: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('perPage', ParseIntPipe) perPage: number,
  ) {
    console.log(page, perPage);
    return this.itemService.findAllBySection(id, page, perPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItem: UpdateItemDto) {
    return this.itemService.update(+id, updateItem);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
