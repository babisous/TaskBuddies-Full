import { Module } from '@nestjs/common';
import { TaskRecurrenceService } from './task_recurrence.service';
import { TaskRecurrenceController } from './task_recurrence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRecurrenceEntity } from './entities/task_recurrence.entity';

@Module({
  controllers: [TaskRecurrenceController],
  providers: [TaskRecurrenceService],
  imports: [TypeOrmModule.forFeature([TaskRecurrenceEntity])],
})
export class TaskRecurrenceModule {}
