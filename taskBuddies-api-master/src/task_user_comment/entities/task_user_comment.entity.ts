import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { TaskUserEntity } from '../../task_user/entities/task_user.entity';

@Entity('task_user_comment')
export class TaskUserCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  author: UserEntity;

  @ManyToOne(() => TaskUserEntity, (taskUser) => taskUser.comments)
  task_user: TaskUserEntity;
}
