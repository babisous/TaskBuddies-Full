import { TaskRecurrenceService } from './task_recurrence.service';
import { CreateTaskRecurrenceDto } from './dto/create-task_recurrence.dto';
import { UpdateTaskRecurrenceDto } from './dto/update-task_recurrence.dto';
export declare class TaskRecurrenceController {
    private readonly taskRecurrenceService;
    constructor(taskRecurrenceService: TaskRecurrenceService);
    create(createTaskRecurrenceDto: CreateTaskRecurrenceDto): void;
    findAll(): Promise<import("./entities/task_recurrence.entity").TaskRecurrenceEntity[]>;
    findOne(id: string): Promise<import("./entities/task_recurrence.entity").TaskRecurrenceEntity[]>;
    update(id: string, updateTaskRecurrenceDto: UpdateTaskRecurrenceDto): void;
    remove(id: string): Promise<import("./entities/task_recurrence.entity").TaskRecurrenceEntity[]>;
}
