import { GroupEntity } from '../../group/entities/group.entity';
import { TaskEntity } from '../../task/entities/task.entity';
import { TagEntity } from '../../tag/entities/tag.entity';
import { Role } from '../../config/enum/roles.enum';
import { TaskUserEntity } from '../../task_user/entities/task_user.entity';
export declare class UserEntity {
    id: number;
    email: string;
    password: string;
    username: string;
    profile_picture: string;
    roles: Role;
    taskUsers: TaskUserEntity[];
    tasks: TaskEntity[];
    createdTags: TagEntity[];
    groups: GroupEntity[];
}
