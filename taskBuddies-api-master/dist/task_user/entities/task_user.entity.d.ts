import { UserEntity } from '../../user/entities/user.entity';
import { TaskEntity } from '../../task/entities/task.entity';
import { TaskUserCommentEntity } from '../../task_user_comment/entities/task_user_comment.entity';
import { Timestamp } from '../../Generic/timestamp.entity';
export declare class TaskUserEntity extends Timestamp {
    id: number;
    doneAt: Date;
    task: TaskEntity;
    user: UserEntity;
    comments: TaskUserCommentEntity[];
}
