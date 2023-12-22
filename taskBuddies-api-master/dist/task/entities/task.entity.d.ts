import { UserEntity } from '../../user/entities/user.entity';
import { TagEntity } from '../../tag/entities/tag.entity';
import { GroupEntity } from '../../group/entities/group.entity';
import { TaskRecurrenceEntity } from '../../task_recurrence/entities/task_recurrence.entity';
import { Timestamp } from '../../Generic/timestamp.entity';
import { TaskUserEntity } from '../../task_user/entities/task_user.entity';
export declare class TaskEntity extends Timestamp {
    id: number;
    title: string;
    recurrences: TaskRecurrenceEntity[];
    author: UserEntity;
    group: GroupEntity;
    tags: TagEntity[];
    taskUsers: TaskUserEntity[];
}
