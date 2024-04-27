import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "src/interfaces/jwt-payload.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        private readonly prisma: PrismaService,
        configService: ConfigService
        ){
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: JwtPayload): Promise<User>{

        const {id} = payload;

        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        if(!user){
            throw new UnauthorizedException('Token no valido')
        }

        if(!user.isActive){
            throw new UnauthorizedException('Usuario no activo')
        }

        return user;
    }
}