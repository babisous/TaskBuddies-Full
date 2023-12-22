import { UserEntity } from '../../user/entities/user.entity';
import { TagEntity } from '../../tag/entities/tag.entity';
import { GroupEntity } from '../../group/entities/group.entity';

import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { TaskRecurrenceEntity } from '../../task_recurrence/entities/task_recurrence.entity';
import { Timestamp } from '../../Generic/timestamp.entity';
import { TaskUserEntity } from '../../task_user/entities/task_user.entity';

@Entity('task')
export class TaskEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(
    () => TaskRecurrenceEntity,
    (taskRecurrence) => taskRecurrence.task,
    { cascade: true },
  )
  recurrences: TaskRecurrenceEntity[];

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  author: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.tasks)
  group: GroupEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.tasks, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  tags: TagEntity[];

  @OneToMany(() => TaskUserEntity, (taskUser) => taskUser.task, {
    cascade: ['insert', 'update'],
  })
  taskUsers: TaskUserEntity[];
}
