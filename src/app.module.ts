import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'bobat-auth-local',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    AuthModule,
    SeedModule,
    SeedModule,
    UsersModule,
  ],
  providers: [UsersService, AuthService, JwtService],
})
export class AppModule {}
