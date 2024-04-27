import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LocationModule } from './location/location.module';
import { SectionModule } from './section/section.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({isGlobal: true}),
    LocationModule,
    SectionModule,
    ItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
