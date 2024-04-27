import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { UserDataDto } from './dto/user-data.dto';
import { IResponseData } from 'src/interfaces/iresponsedata.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(data: User): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const newUser = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });
      return newUser
    } catch (error) {
      console.log(error, 'error');
      if (error.code === 'P2002') {
        throw new ConflictException(`El ${error.meta.target[0]} ya existe`);
      }
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async findAll(): Promise<IResponseData<any[]>> {
    const usersList = await this.prisma.user.findMany();

    return {
      data: usersList,
    };
  }

  async findOne(id: number): Promise<IResponseData<any>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        lastName: true,
        rut: true,
        email: true,
        isActive: true,
        role: true,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return { data: user };
  }

  async update(id: number, updateData: User): Promise<IResponseData<User>> {
    try {
      const { password } = updateData;
      const user = await this.findOne(id);

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
        const passwordUpdate = await this.prisma.user.update({
          where: { id },
          data: updateData,
        });
        return { data: passwordUpdate };
      }

      const passwordUpdate = await this.prisma.user.update({
        where: { id },
        data: updateData,
      });
      return { data: passwordUpdate };
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }

  async remove(id: number): Promise<IResponseData<User>> {
    try {
      const userDelete = await this.prisma.user.delete({ where: { id } });
      return { data: userDelete };
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: error,
      });
    }
  }
}
