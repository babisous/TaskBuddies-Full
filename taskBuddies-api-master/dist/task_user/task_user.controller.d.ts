import { TaskUserService } from './task_user.service';
import { TaskUserEntity } from './entities/task_user.entity';
import { UserEntity } from 'src/user/entities/user.entity';
export declare class TaskUserController {
    private readonly taskUserService;
    constructor(taskUserService: TaskUserService);
    findAll(): Promise<TaskUserEntity[]>;
    findOne(id: number): Promise<TaskUserEntity[]>;
    update(id: number, taskUser: Partial<TaskUserEntity>): Promise<TaskUserEntity[]>;
    create(taskUser: TaskUserEntity, user: any): Promise<TaskUserEntity>;
    deleteTaskUser(taskId: number, user: UserEntity): Promise<{
        message: string;
    }>;
    hasValidatedToday(user: UserEntity, taskId: number, onDate: string): Promise<{
        validated: boolean;
    }>;
    fetchTaskUsersByGroupAndDate(groupId: number, onDate: string): Promise<TaskUserEntity[]>;
    fetchTasksByUserAndDateRange(user: UserEntity, startDate: string, endDate: string): Promise<TaskUserEntity[]>;
    fetchTaskUsersInGroupByDateRange(user: UserEntity, startDate: string, endDate: string): Promise<TaskUserEntity[]>;
    fetchCountTaskUsersByUserOnDateRange(groupId: number, userId: number, startDate: string, endDate: string): Promise<number>;
    fetchTasksByUserAndDate(user: UserEntity, onDate: string): Promise<TaskUserEntity[]>;
}
