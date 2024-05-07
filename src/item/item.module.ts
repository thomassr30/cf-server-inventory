import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UniformService } from '../uniform/uniform.service';

@Module({
  controllers: [ItemController],
  providers: [ItemService, UniformService],
  imports: [PrismaModule],
})
export class ItemModule {}
