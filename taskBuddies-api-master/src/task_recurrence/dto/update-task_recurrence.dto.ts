import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskRecurrenceDto } from './create-task_recurrence.dto';

export class UpdateTaskRecurrenceDto extends PartialType(CreateTaskRecurrenceDto) {}
