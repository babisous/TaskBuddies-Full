import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskRecurrenceService } from './task_recurrence.service';
import { CreateTaskRecurrenceDto } from './dto/create-task_recurrence.dto';
import { UpdateTaskRecurrenceDto } from './dto/update-task_recurrence.dto';

@Controller('task-recurrence')
export class TaskRecurrenceController {
  constructor(private readonly taskRecurrenceService: TaskRecurrenceService) {}

  @Post()
  create(@Body() createTaskRecurrenceDto: CreateTaskRecurrenceDto) {}

  @Get()
  findAll() {
    return this.taskRecurrenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskRecurrenceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskRecurrenceDto: UpdateTaskRecurrenceDto,
  ) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskRecurrenceService.remove(+id);
  }
}
