import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IResponseData } from 'src/interfaces/iresponsedata.interface';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLocation: CreateLocationDto): Promise<Location> {
    try {
      const location = await this.prisma.location.create({
        data: createLocation,
      });

      return location
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async findAll(): Promise<Location[]> {
    try {
      const locations = await this.prisma.location.findMany({});

      return locations
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async findOne(id: string): Promise<Location> {
    try {
      const location = await this.prisma.location.findUnique({
        where: {
          id: id,
        },
      });

      return location
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async update(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    try {
      const location = await this.prisma.location.update({
        where: {
          id: id,
        },
        data: updateLocationDto,
      });

      return location
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async remove(id: string): Promise<Location> {
    try {
      const location = await this.prisma.location.delete({
        where: {
          id: id,
        },
      });

      return location
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }
}
