import { GroupEntity } from '../../group/entities/group.entity';
import { TaskEntity } from '../../task/entities/task.entity';
import { TagEntity } from '../../tag/entities/tag.entity';

import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Role } from '../../config/enum/roles.enum';
import { TaskUserEntity } from '../../task_user/entities/task_user.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    nullable: true,
  })
  profile_picture: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
    nullable: false,
  })
  roles: Role;

  @OneToMany(() => TaskUserEntity, (taskUser) => taskUser.user)
  taskUsers: TaskUserEntity[];

  @OneToMany(() => TaskEntity, (task) => task.author)
  tasks: TaskEntity[];

  @OneToMany(() => TagEntity, (tag) => tag.createdBy)
  createdTags: TagEntity[];

  @ManyToMany(() => GroupEntity, (group) => group.users, { cascade: true })
  groups: GroupEntity[];
}
