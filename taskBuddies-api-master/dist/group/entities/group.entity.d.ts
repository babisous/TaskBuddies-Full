import { Timestamp } from '../../Generic/timestamp.entity';
import { TagEntity } from '../../tag/entities/tag.entity';
import { TaskEntity } from '../../task/entities/task.entity';
import { UserEntity } from '../../user/entities/user.entity';
export declare class GroupEntity extends Timestamp {
    id: number;
    name: string;
    entryCode: string;
    users: UserEntity[];
    tasks: TaskEntity[];
    tags: TagEntity[];
    createdBy: UserEntity;
}
