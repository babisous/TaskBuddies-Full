import { Timestamp } from '../../Generic/timestamp.entity';
import { TagEntity } from '../../tag/entities/tag.entity';
import { TaskEntity } from '../../task/entities/task.entity';
import { UserEntity } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';

@Entity('group')
export class GroupEntity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  entryCode: string;

  @ManyToMany(() => UserEntity, (user) => user.groups)
  @JoinTable()
  users: UserEntity[];

  @OneToMany(() => TaskEntity, (task) => task.group)
  tasks: TaskEntity[];

  @ManyToMany(() => TagEntity, (tag) => tag.group)
  @JoinTable()
  tags: TagEntity[];

  @ManyToOne(() => UserEntity)
  createdBy: UserEntity;
}
