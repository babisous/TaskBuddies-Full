import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { TaskEntity } from './entities/task.entity';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(user: any, createTaskDto: CreateTaskDto): Promise<TaskEntity>;
    findAll(user: UserEntity): Promise<TaskEntity[]>;
    findOnDate(date: string, tags: [], user: UserEntity): Promise<TaskEntity[]>;
    findOne(id: number): Promise<TaskEntity[]>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity>;
    remove(id: string): Promise<void>;
    createWithGroup(task: Partial<TaskEntity>, user: UserEntity, groupId: number): Promise<TaskEntity>;
    findAllTasksByGroup(groupId: number): Promise<TaskEntity[]>;
    getOnDateWithGroup(groupId: number, date: string, tags: number[]): Promise<TaskEntity[]>;
}
