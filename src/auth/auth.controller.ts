import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  createUser(@Body() createUser: User) {
    return this.authService.createUser(createUser);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/check-status')
  @UseGuards(AuthGuard())
  checkAuthStatus(@Req() request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') || [];
    return this.authService.checkAuthStatus(token);
  }
}
