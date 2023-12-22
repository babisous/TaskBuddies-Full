import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from '../user/entities/user.entity';
import { TagEntity } from '../tag/entities/tag.entity';
import { GroupEntity } from '../group/entities/group.entity';
import { TaskRecurrenceEntity } from '../task_recurrence/entities/task_recurrence.entity';
export declare class TaskService {
    private taskRepository;
    private tagRepository;
    private groupRepository;
    private recurrenceRepository;
    constructor(taskRepository: Repository<TaskEntity>, tagRepository: Repository<TagEntity>, groupRepository: Repository<GroupEntity>, recurrenceRepository: Repository<TaskRecurrenceEntity>);
    private assignUserToTag;
    create(createTaskDto: any, user: UserEntity): Promise<TaskEntity>;
    findAll(user: UserEntity): Promise<TaskEntity[]>;
    findOne(id: number): Promise<TaskEntity[]>;
    update(id: number, updateTaskDto: any): Promise<TaskEntity>;
    remove(id: number): Promise<void>;
    getTasksOnDate(date: Date, user: UserEntity, tags?: number[]): Promise<TaskEntity[]>;
    createWithGroup(task: Partial<TaskEntity>, user: UserEntity, groupId: any): Promise<TaskEntity>;
    findAllTasksByGroup(groupId: number): Promise<TaskEntity[]>;
    getTasksOnDateWithGroup(groupId: number, date?: Date, tags?: number[]): Promise<TaskEntity[]>;
}
