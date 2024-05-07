import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ToolService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createToolDto: CreateToolDto): Promise<any>{
    try {
      const tool = await this.prisma.tool.create({
        data: createToolDto
      })

      return tool;
    } catch (error) {
       throw new BadRequestException('Error al crear tool', {
        cause: new Error(),
        description: error,
      });
    }
  }

  findAll() {
    return `This action returns all tool`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tool`;
  }

  async update(id: number, updateToolDto: UpdateToolDto): Promise<any> {
     try {
      const tool = await this.prisma.tool.update({
        where: { id },
        data: updateToolDto
      })

      return tool;
    } catch (error) {
       throw new BadRequestException('Error al actualizar tool', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const tool = await this.prisma.tool.delete({
        where: { id }
      })
      return tool;
    } catch (error) {
      throw new BadRequestException('Error al eliminar tool', {
        cause: new Error(),
        description: error,
      });
    }
  }
}
