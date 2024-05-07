import { Injectable } from '@nestjs/common';
import { CreateUniformDto } from './dto/create-uniform.dto';
import { UpdateUniformDto } from './dto/update-uniform.dto';

@Injectable()
export class UniformService {
  create(createUniformDto: CreateUniformDto) {
    return 'This action adds a new uniform';
  }

  findAll() {
    return `This action returns all uniform`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uniform`;
  }

  update(id: number, updateUniformDto: UpdateUniformDto) {
    return `This action updates a #${id} uniform`;
  }

  remove(id: number) {
    return `This action removes a #${id} uniform`;
  }
}
