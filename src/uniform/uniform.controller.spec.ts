import { Test, TestingModule } from '@nestjs/testing';
import { UniformController } from './uniform.controller';
import { UniformService } from './uniform.service';

describe('UniformController', () => {
  let controller: UniformController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniformController],
      providers: [UniformService],
    }).compile();

    controller = module.get<UniformController>(UniformController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
