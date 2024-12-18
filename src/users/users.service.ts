import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<any> {
    return await this.userRepository.find();
  }

  async findOne(username: string): Promise<any> {
    return await this.userRepository.findOne({ where: { username } });
  }
}
