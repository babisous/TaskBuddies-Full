import { TaskEntity } from '../../task/entities/task.entity';
export declare class TaskRecurrenceEntity {
    id: number;
    task: TaskEntity;
    start_date: Date;
    end_date: Date;
    day_of_week: number;
    day_of_month: number;
    recurrence_interval: number;
}
