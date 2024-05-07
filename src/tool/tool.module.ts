import { Module } from '@nestjs/common';
import { ToolService } from './tool.service';
import { ToolController } from './tool.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ToolController],
  providers: [ToolService],
  imports: [PrismaModule],
})
export class ToolModule {}
