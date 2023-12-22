import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { TaskEntity } from '../../task/entities/task.entity';
import { TaskUserCommentEntity } from '../../task_user_comment/entities/task_user_comment.entity';
import { Timestamp } from '../../Generic/timestamp.entity';

@Entity('task_user')
export class TaskUserEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doneAt: Date;

  @ManyToOne(() => TaskEntity, (task) => task.id)
  task: TaskEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  user: UserEntity;

  @OneToMany(() => TaskUserCommentEntity, (comment) => comment.task_user)
  comments: TaskUserCommentEntity[];
}
