import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Section } from '@prisma/client';
import { IResponseData } from 'src/interfaces/iresponsedata.interface';

@Injectable()
export class SectionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSectionDto: CreateSectionDto): Promise<Section> {
    try {
      const section = await this.prisma.section.create({
        data: createSectionDto,
      });

      return section
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async findAll(): Promise<Section[]> {
    try {
      const sections = await this.prisma.section.findMany();

      return sections
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async findAllByLocation(id: string): Promise<Section[]> {
    try {
      const sections = await this.prisma.section.findMany({
        where: {
          locationId: id,
        },
      });

      return sections
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async findOne(id: string): Promise<Section> {
    try {
      const section = await this.prisma.section.findUnique({
        where: {
          id: id,
        },
      });

      return section
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async update(id: string, updateSection: UpdateSectionDto): Promise<Section> {
    try {
      const section = await this.prisma.section.update({
        where: {
          id: id,
        },
        data: updateSection,
      });

      return section
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async remove(id: string): Promise<Section> {
    try {
      const section = await this.prisma.section.delete({
        where: {
          id: id,
        },
      });

      return section
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }
}
