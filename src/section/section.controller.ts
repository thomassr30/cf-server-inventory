import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from '@prisma/client';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  create(@Body() createSection: CreateSectionDto) {
    return this.sectionService.create(createSection);
  }

  @Get()
  findAll() {
    return this.sectionService.findAll();
  }

  @Get('location/:id')
  findAllByLocation(@Param('id') id: string) {
    return this.sectionService.findAllByLocation(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSection: UpdateSectionDto) {
    return this.sectionService.update(id, updateSection);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionService.remove(id);
  }
}
