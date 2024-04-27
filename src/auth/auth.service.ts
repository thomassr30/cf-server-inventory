import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { IResponseData } from 'src/interfaces/iresponsedata.interface';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUser: User): Promise<User> {
    const user = await this.userService.create(createUser);
    return user;
  }

  async login(loginDto: LoginDto): Promise<IResponseData> {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        password: true,
        id: true,
        isActive: true,
        role: true,
        name: true,
        lastName: true,
      },
    });

    if (!user) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Credenciales incorrectas',
      };
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Credenciales incorrectas',
      };
    }

    if (!user.isActive) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Usuario inactivo',
      };
    }

    return {
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        lastName: user.lastName,
      },
      access_token: this.jwtService.sign(
        { id: user.id },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
        },
      ),
    };
  }

  async checkAuthStatus(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      }) as JwtPayload;

      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.id,
        },
        select: {
          email: true,
          role: true,
        },
      });

      return {
        data: {
          id: payload.id,
          email: user.email,
          role: user.role,
        },
        access_token: this.jwtService.sign(
          { id: payload.id },
          {
            secret: process.env.JWT_SECRET,
            expiresIn: '1d',
          },
        ),
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
