import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UseGuards,
  ParseArrayPipe,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-passport.guard';
import { User } from '../config/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { TaskEntity } from './entities/task.entity';

@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@User() user: any, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto, user);
  }

  @Get()
  findAll(@User() user: UserEntity) {
    return this.taskService.findAll(user);
  }

  @Get('date')
  findOnDate(
    @Query('date') date: string,
    @Query('tags') tags: [],
    @User() user: UserEntity,
  ) {
    const taskDate = date ? new Date(date) : new Date();
    return this.taskService.getTasksOnDate(taskDate, user, tags);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  @Post('group/:groupId')
  createWithGroup(
    @Body() task: Partial<TaskEntity>,
    @User() user: UserEntity,
    @Param('groupId') groupId: number,
  ) {
    return this.taskService.createWithGroup(task, user, groupId);
  }

  @Get('group/:groupId')
  findAllTasksByGroup(@Param('groupId') groupId: number) {
    return this.taskService.findAllTasksByGroup(groupId);
  }

  @Get('group/:groupId/date/:date')
  getOnDateWithGroup(
    @Param('groupId') groupId: number,
    @Param('date') date: string,
    @Query('tags') tags: number[],
  ) {
    const taskDate = date ? new Date(date) : new Date();
    return this.taskService.getTasksOnDateWithGroup(groupId, taskDate, tags);
  }
}
