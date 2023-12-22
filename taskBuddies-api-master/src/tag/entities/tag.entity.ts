import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { GroupEntity } from '../../group/entities/group.entity';
import { TaskEntity } from '../../task/entities/task.entity';
import { Timestamp } from '../../Generic/timestamp.entity';

@Entity('tag')
export class TagEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  color: string;

  @ManyToOne(() => UserEntity, (user) => user.createdTags)
  createdBy: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.tags)
  group: GroupEntity;

  @ManyToMany(() => TaskEntity, (task) => task.tags)
  tasks: TaskEntity[];
}
