import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from '@prisma/client';
import { IResponseData } from 'src/interfaces/iresponsedata.interface';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    try {
      const item = await this.prisma.item.create({
        data: createItemDto,
      });

      return item
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async findAllBySection(id: string): Promise<any> {
    try {
      const itemsList = await this.prisma.item.findMany({
        where: {
          sectionId: id,
        },
        select:{
          id: true,
          name: true,
          description: true,
          quantity: true,
          section: {
            select: {
              name: true
            }
          }          
        }
      });

      const sectionName = itemsList[0].section.name
      const items = itemsList.map(item => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          quantity: item.quantity
        }
      })

      return {
        section: sectionName,
        items: items
      }
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async findOne(id: number): Promise<Item> {
    try {
      const item = await this.prisma.item.findUnique({
        where: {
          id: id,
        },
      });

      return item
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async update(id: number, updateItem: UpdateItemDto): Promise<Item> {
    try {
      const item = await this.prisma.item.update({
        where: {
          id: id,
        },
        data: updateItem,
      });

      return item
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async remove(id: number): Promise<Item> {
    try {
      const item = await this.prisma.item.delete({
        where: {
          id: id,
        },
      });

      return item
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }
}
