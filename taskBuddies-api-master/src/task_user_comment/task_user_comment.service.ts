import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskUserCommentDto } from './dto/create-task_user_comment.dto';
import { UpdateTaskUserCommentDto } from './dto/update-task_user_comment.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskUserCommentEntity } from './entities/task_user_comment.entity';
import { TaskUserEntity } from 'src/task_user/entities/task_user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskUserCommentService {
  constructor(
    @InjectRepository(TaskUserCommentEntity)
    private taskUserCommentRepository: Repository<TaskUserCommentEntity>,
    @InjectRepository(TaskUserEntity)
    private taskUserRepository: Repository<TaskUserEntity>,
  ) {}

  async create(
    taskUserId: number,
    createTaskUserCommentDto: CreateTaskUserCommentDto,
    user: UserEntity,
  ) {
    const taskUser = await this.taskUserRepository.findOne({
      where: { id: taskUserId },
    });
    if (!taskUser) {
      throw new Error('TaskUser not found');
    }

    const newComment = new TaskUserCommentEntity();
    newComment.content = createTaskUserCommentDto.content;
    newComment.author = user;
    newComment.task_user = taskUser;

    return this.taskUserCommentRepository.save(newComment);
  }

  findAll() {
    return this.taskUserCommentRepository.find();
  }

  async findAllCommentsByTaskUser(
    taskUserId: number,
  ): Promise<TaskUserCommentEntity[]> {
    return this.taskUserCommentRepository.find({
      where: { task_user: { id: taskUserId } },
      relations: ['author'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} taskUserComment`;
  }

  update(id: number, updateTaskUserCommentDto: UpdateTaskUserCommentDto) {
    return `This action updates a #${id} taskUserComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskUserComment`;
  }
}
