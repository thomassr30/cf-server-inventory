import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UniformService } from './uniform.service';
import { CreateUniformDto } from './dto/create-uniform.dto';
import { UpdateUniformDto } from './dto/update-uniform.dto';

@Controller('uniform')
export class UniformController {
  constructor(private readonly uniformService: UniformService) {}

  @Post()
  create(@Body() createUniformDto: CreateUniformDto) {
    return this.uniformService.create(createUniformDto);
  }

  @Get()
  findAll() {
    return this.uniformService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uniformService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUniformDto: UpdateUniformDto) {
    return this.uniformService.update(+id, updateUniformDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uniformService.remove(+id);
  }
}
