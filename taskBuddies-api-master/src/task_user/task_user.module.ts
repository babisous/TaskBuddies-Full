import { Module } from '@nestjs/common';
import { TaskUserService } from './task_user.service';
import { TaskUserController } from './task_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskUserEntity } from './entities/task_user.entity';

@Module({
  controllers: [TaskUserController],
  providers: [TaskUserService],
  imports: [TypeOrmModule.forFeature([TaskUserEntity])],
})
export class TaskUserModule {}
