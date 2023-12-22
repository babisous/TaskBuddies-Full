import { UserEntity } from '../../user/entities/user.entity';
import { GroupEntity } from '../../group/entities/group.entity';
import { TaskEntity } from '../../task/entities/task.entity';
import { Timestamp } from '../../Generic/timestamp.entity';
export declare class TagEntity extends Timestamp {
    id: number;
    title: string;
    icon: string;
    color: string;
    createdBy: UserEntity;
    group: GroupEntity;
    tasks: TaskEntity[];
}
