import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskUserCommentService } from './task_user_comment.service';
import { CreateTaskUserCommentDto } from './dto/create-task_user_comment.dto';
import { UpdateTaskUserCommentDto } from './dto/update-task_user_comment.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/config/decorators/user.decorator';

@Controller('task-user-comment')
export class TaskUserCommentController {
  constructor(
    private readonly taskUserCommentService: TaskUserCommentService,
  ) {}

  @Post(':taskUserId')
  create(
    @Param('taskUserId') taskUserId: string,
    @Body() createTaskUserCommentDto: CreateTaskUserCommentDto,
    @User() user: UserEntity,
  ) {
    return this.taskUserCommentService.create(
      +taskUserId,
      createTaskUserCommentDto,
      user,
    );
  }

  @Get()
  findAll() {
    return this.taskUserCommentService.findAll();
  }

  @Get(':taskUserId')
  findAllByTaskUser(@Param('taskUserId') taskUserId: number) {
    return this.taskUserCommentService.findAllCommentsByTaskUser(taskUserId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskUserCommentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskUserCommentDto: UpdateTaskUserCommentDto,
  ) {
    return this.taskUserCommentService.update(+id, updateTaskUserCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskUserCommentService.remove(+id);
  }
}
