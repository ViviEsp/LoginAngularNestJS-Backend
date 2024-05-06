import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { LocationEntity } from 'src/location/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, LocationEntity])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
