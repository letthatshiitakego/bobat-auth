import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    // Seed admin user if not exists
    const adminExists = await this.userRepository.findOne({
      where: { username: 'admin' },
    });
    if (!adminExists) {
      const password = await bcrypt.hash('admin_password', 10);
      await this.userRepository.save({
        username: 'admin',
        password,
        role: 'admin',
      });
      console.log('Admin user seeded: admin/admin_password');
    }

    // Seed regular user
    const userExists = await this.userRepository.findOne({
      where: { username: 'user' },
    });
    if (!userExists) {
      const password = await bcrypt.hash('user_password', 10);
      await this.userRepository.save({
        username: 'user',
        password,
        role: 'user',
      });
      console.log('User seeded: user/user_password');
    }
  }
}
