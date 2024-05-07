import { Test, TestingModule } from '@nestjs/testing';
import { UniformService } from './uniform.service';

describe('UniformService', () => {
  let service: UniformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniformService],
    }).compile();

    service = module.get<UniformService>(UniformService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
