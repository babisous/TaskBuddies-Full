import { Repository } from 'typeorm';
import { TaskUserEntity } from './entities/task_user.entity';
import { UserEntity } from 'src/user/entities/user.entity';
export declare class TaskUserService {
    private taskUserRepository;
    constructor(taskUserRepository: Repository<TaskUserEntity>);
    create(taskUser: Partial<TaskUserEntity>, user: any): Promise<TaskUserEntity>;
    findAll(): Promise<TaskUserEntity[]>;
    findOne(id: number): Promise<TaskUserEntity[]>;
    update(id: number, taskUser: Partial<TaskUserEntity>): Promise<TaskUserEntity[]>;
    deleteByTaskAndUser(taskId: number, userId: number): Promise<import("typeorm").UpdateResult>;
    hasTaskBeenValidatedOnDate(taskId: number, userId: number, onDate: Date): Promise<boolean>;
    fetchTasksByUserAndDate(user: UserEntity, onDate: Date): Promise<TaskUserEntity[]>;
    fetchTaskUsersByGroupAndDate(groupId: number, onDate: Date): Promise<TaskUserEntity[]>;
    fetchTaskUsersInGroupByDateRange(user: UserEntity, startDate: Date, endDate: Date): Promise<TaskUserEntity[]>;
    fetchCountTaskUsersByGroupAndUserOnDateRange(groupId: number, userId: number, startDate: Date, endDate: Date): Promise<number>;
    fetchTasksByUserAndDateRange(user: UserEntity, startDate: Date, endDate: Date): Promise<TaskUserEntity[]>;
}
