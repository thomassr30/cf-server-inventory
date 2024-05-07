import { Module } from '@nestjs/common';
import { UniformService } from './uniform.service';
import { UniformController } from './uniform.controller';

@Module({
  controllers: [UniformController],
  providers: [UniformService],
})
export class UniformModule {}
