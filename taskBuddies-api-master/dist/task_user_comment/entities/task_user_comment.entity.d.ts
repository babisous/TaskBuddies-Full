import { UserEntity } from '../../user/entities/user.entity';
import { TaskUserEntity } from '../../task_user/entities/task_user.entity';
export declare class TaskUserCommentEntity {
    id: number;
    content: string;
    author: UserEntity;
    task_user: TaskUserEntity;
}
