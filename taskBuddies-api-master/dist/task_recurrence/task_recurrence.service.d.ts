import { Repository } from 'typeorm';
import { TaskRecurrenceEntity } from './entities/task_recurrence.entity';
export declare class TaskRecurrenceService {
    private taskRecurrenceRepository;
    constructor(taskRecurrenceRepository: Repository<TaskRecurrenceEntity>);
    create(recurrenceData: TaskRecurrenceEntity): Promise<TaskRecurrenceEntity>;
    findAll(): Promise<TaskRecurrenceEntity[]>;
    findOne(id: number): Promise<TaskRecurrenceEntity[]>;
    update(id: number, recurrenceData: TaskRecurrenceEntity): Promise<TaskRecurrenceEntity[]>;
    remove(id: number): Promise<TaskRecurrenceEntity[]>;
}
