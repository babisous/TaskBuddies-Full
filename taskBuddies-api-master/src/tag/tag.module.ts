import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { TaskEntity } from 'src/task/entities/task.entity';
import { GroupEntity } from 'src/group/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, TaskEntity, GroupEntity])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
