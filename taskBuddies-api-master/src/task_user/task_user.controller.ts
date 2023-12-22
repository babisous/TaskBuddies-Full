import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskUserService } from './task_user.service';
import { TaskUserEntity } from './entities/task_user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-passport.guard';
import { User } from '../config/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('task-user')
export class TaskUserController {
  constructor(private readonly taskUserService: TaskUserService) {}

  @Get()
  findAll() {
    return this.taskUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskUserService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() taskUser: Partial<TaskUserEntity>) {
    return this.taskUserService.update(id, taskUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() taskUser: TaskUserEntity, @User() user: any) {
    return this.taskUserService.create(taskUser, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':taskId')
  async deleteTaskUser(
    @Param('taskId') taskId: number,
    @User() user: UserEntity,
  ) {
    const userId = user.id; // Récupère l'ID de l'utilisateur à partir du décorateur User

    await this.taskUserService.deleteByTaskAndUser(taskId, userId);

    return { message: 'TaskUser deleted successfully' };
  }

  @Get(':taskId/validated-today/:onDate')
  async hasValidatedToday(
    @User() user: UserEntity,
    @Param('taskId') taskId: number,
    @Param('onDate') onDate: string,
  ) {
    const validated = await this.taskUserService.hasTaskBeenValidatedOnDate(
      taskId,
      user.id, // Passez l'ID de l'utilisateur à la méthode
      new Date(onDate),
    );
    return { validated };
  }

  @Get('group/:groupId/date/:onDate')
  async fetchTaskUsersByGroupAndDate(
    @Param('groupId') groupId: number,
    @Param('onDate') onDate: string,
  ): Promise<TaskUserEntity[]> {
    return this.taskUserService.fetchTaskUsersByGroupAndDate(
      groupId,
      new Date(onDate),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/date-range/:startDate/:endDate')
  async fetchTasksByUserAndDateRange(
    @User() user: UserEntity,
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ): Promise<TaskUserEntity[]> {
    return this.taskUserService.fetchTasksByUserAndDateRange(
      user, // Utilisez le décorateur User pour passer l'entité utilisateur complète
      new Date(startDate),
      new Date(endDate),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/group/date-range/:startDate/:endDate')
  async fetchTaskUsersInGroupByDateRange(
    @User() user: UserEntity,
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ): Promise<TaskUserEntity[]> {
    return this.taskUserService.fetchTaskUsersInGroupByDateRange(
      user, // Utilisez le décorateur User pour passer l'entité utilisateur complète
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('count/:groupId/:userId/date-range/:startDate/:endDate')
  async fetchCountTaskUsersByUserOnDateRange(
    @Param('groupId') groupId: number,
    @Param('userId') userId: number,
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ): Promise<number> {
    return this.taskUserService.fetchCountTaskUsersByGroupAndUserOnDateRange(
      groupId,
      userId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/date/:onDate')
  async fetchTasksByUserAndDate(
    @User() user: UserEntity,
    @Param('onDate') onDate: string,
  ): Promise<TaskUserEntity[]> {
    return this.taskUserService.fetchTasksByUserAndDate(
      user, // Passez l'entité utilisateur complète
      new Date(onDate),
    );
  }
}
