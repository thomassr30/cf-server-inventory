import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item, Uniform } from '@prisma/client';
import { IResponseData } from 'src/interfaces/iresponsedata.interface';
import { UniformService } from 'src/uniform/uniform.service';

@Injectable()
export class ItemService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uniformService: UniformService,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    try {
      const { sectionId, type, itemData } = createItemDto;
      console.log(createItemDto);

      const item = await this.prisma.item.create({
        data: {
          sectionId: sectionId,
          type: type,
        },
      });

      if (type === 'TOOL') {
        const toolData = {
          itemId: Number(item.id),
          ...itemData,
        };
        await this.prisma.tool.create({
          data: toolData,
        });
      }

      if (type === 'FURNITURE') {
        const furnitureData = {
          itemId: Number(item.id),
          ...itemData,
        };
        await this.prisma.furniture.create({
          data: furnitureData,
        });
      }

      if (type === 'UNIFORM') {
        const uniformData = {
          itemId: Number(item.id),
          name: itemData.name,
          code: itemData.code,
          size: itemData.size,
          brand: itemData.brand,
          quantity: itemData.quantity,
          description: itemData.description,
        };
        console.log(uniformData);
        await this.prisma.uniform.create({
          data: uniformData,
        });
      }

      return item;
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async findAll(id: string): Promise<any> {
    try {
      const items = await this.prisma.item.findMany({
        where: {
          sectionId: id,
        },
        select: {
          id: true,
          type: true,
          furniture: {
            select: {
              id: true,
              name: true,
              description: true,
              quantity: true,
            },
          },
          tool: {
            select: {
              id: true,
              name: true,
              description: true,
              quantity: true,
            },
          },
          uniform: {
            select: {
              id: true,
              name: true,
              description: true,
              quantity: true,
              code: true,
              size: true,
              brand: true,
            },
          },
          section: {
            select: {
              name: true,
            },
          },
        },
      });

      if (items.length === 0) {
        return [];
      }

      const filteredData = items.map((item) => {
        const newItem: any = {};
        Object.keys(item).forEach((key) => {
          if (item[key] !== null) {
            newItem[key] = item[key];
          }
        });
        return newItem;
      });

      const sectionName = items[0].section.name;
      const itemsFilter = filteredData.map(({ section, ...rest }) => rest);

      return {
        section: sectionName,
        items: itemsFilter,
      };
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  /**
   * Retrieves a paginated list of items by section ID.
   *
   * @param id - The ID of the section.
   * @param page - The page number.
   * @param perPage - The number of items per page.
   * @returns A Promise that resolves to an object containing the list of items and metadata.
   * @throws BadRequestException if there is an error retrieving the list of items.
   */
  async findAllBySection(
    id: string,
    page: number,
    perPage: number,
  ): Promise<any> {
    try {
      const skip = page * perPage;
      const itemsList = await this.prisma.item.findMany({
        where: {
          sectionId: id,
        },
        select: {
          id: true,
          type: true,
          furniture: {
            select: {
              id: true,
              name: true,
              description: true,
              quantity: true,
            },
          },
          tool: {
            select: {
              id: true,
              name: true,
              description: true,
              quantity: true,
            },
          },
          uniform: {
            select: {
              id: true,
              name: true,
              description: true,
              quantity: true,
              code: true,
              size: true,
              brand: true,
            },
          },
          section: {
            select: {
              name: true,
            },
          },
        },
        skip,
        take: perPage,
      });

      const totalItems = await this.prisma.item.count({
        where: {
          sectionId: id,
        },
      });

      if (itemsList.length === 0) {
        return {
          dataList: [],
          meta: {
            totalData: totalItems,
            page,
            perPage,
          },
        };
      }

      const filteredData = itemsList.map((item) => {
        const newItem: any = {};
        Object.keys(item).forEach((key) => {
          if (item[key] !== null) {
            newItem[key] = item[key];
          }
        });
        return newItem;
      });

      const sectionName = itemsList[0].section.name;
      const items = filteredData.map(({ section, ...rest }) => rest);

      return {
        dataList: {
          section: sectionName,
          items: items,
        },
        meta: {
          totalData: totalItems,
          page,
          perPage,
        },
      };
    } catch (error) {
      throw new BadRequestException('Error al obtener lista de items', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const item = await this.prisma.item.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          type: true,
          furniture: {
            select: {
              id: true,
              name: true,
              description: true,
              quantity: true,
            },
          },
          tool: {
            select: {
              id: true,
              name: true,
              description: true,
              quantity: true,
            },
          },
          uniform: {
            select: {
              id: true,
              name: true,
              description: true,
              quantity: true,
              code: true,
              size: true,
              brand: true,
            },
          },
        },
      });

      return item;
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async update(id: number, updateItem: UpdateItemDto) {
    try {
      const item = await this.findOne(id);
      if (!item) {
        console.log('item no encontrado');
        throw new BadRequestException('Item not found');
      }

      const { type, itemData } = updateItem;

      let updateData = {};

      if (type === 'UNIFORM') {
      }

      if (type === 'TOOL') {
        const { id, ...dataItem } = itemData;
        updateData = await this.prisma.tool.update({
          where: {
            id,
          },
          data: dataItem,
        });

        return updateData;
      }

      if (type === 'FURNITURE') {
      }

      return {
        type: type,
        itemData: updateData,
      };
    } catch (error) {
      throw new BadRequestException('Error al actualizar item', {
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

      return item;
    } catch (error) {
      throw new BadRequestException('Error al eliminar el item', {
        cause: new Error(),
        description: error,
      });
    }
  }
}
