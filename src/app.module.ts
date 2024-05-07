import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LocationModule } from './location/location.module';
import { SectionModule } from './section/section.module';
import { ItemModule } from './item/item.module';
import { ToolModule } from './tool/tool.module';
import { UniformModule } from './uniform/uniform.module';
import { FurnitureModule } from './furniture/furniture.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({isGlobal: true}),
    LocationModule,
    SectionModule,
    ItemModule,
    ToolModule,
    UniformModule,
    FurnitureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
