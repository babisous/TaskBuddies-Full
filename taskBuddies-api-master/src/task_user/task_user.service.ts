// task-user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThan, Repository } from 'typeorm';
import { TaskUserEntity } from './entities/task_user.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/config/decorators/user.decorator';

@Injectable()
export class TaskUserService {
  constructor(
    @InjectRepository(TaskUserEntity)
    private taskUserRepository: Repository<TaskUserEntity>,
  ) {}

  async create(taskUser: Partial<TaskUserEntity>, user: any) {
    const taskId = taskUser.task.id;
    const userId = user.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Définit l'heure à 00:00:00 pour la comparaison

    const existingTaskUser = await this.taskUserRepository.findOne({
      where: {
        task: { id: taskId },
        user: { id: userId },
        doneAt: MoreThan(today), // Vérifie si un enregistrement existe déjà pour la tâche et l'utilisateur aujourd'hui
      },
    });

    if (existingTaskUser) {
      throw new Error('Task already validated today');
    }

    taskUser.doneAt = new Date();
    taskUser.user = user;

    const newTaskUser = this.taskUserRepository.create(taskUser);
    return this.taskUserRepository.save(newTaskUser);
  }

  async findAll() {
    return this.taskUserRepository.find({ relations: ['task', 'user'] });
  }

  async findOne(id: number) {
    return this.taskUserRepository.findBy({ id });
  }

  async update(id: number, taskUser: Partial<TaskUserEntity>) {
    await this.taskUserRepository.update(id, taskUser);
    return this.findOne(id);
  }

  async deleteByTaskAndUser(taskId: number, userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Définit l'heure à 00:00:00 pour la comparaison

    const taskUser = await this.taskUserRepository.findOne({
      where: {
        task: { id: taskId },
        user: { id: userId },
        doneAt: MoreThan(today), // Vérifie que la tâche a été validée aujourd'hui
      },
    });

    if (taskUser) {
      return this.taskUserRepository.softDelete(taskUser.id);
    }
  }

  async hasTaskBeenValidatedOnDate(
    taskId: number,
    userId: number,
    onDate: Date,
  ): Promise<boolean> {
    const startDate = new Date(onDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(onDate);
    endDate.setHours(23, 59, 59, 999);

    const taskUser = await this.taskUserRepository.findOne({
      where: {
        task: { id: taskId },
        user: { id: userId }, // Ajoutez l'utilisateur à la clause where
        doneAt: Between(startDate, endDate),
      },
    });

    return !!taskUser;
  }

  async fetchTasksByUserAndDate(
    @User() user: UserEntity,
    onDate: Date,
  ): Promise<TaskUserEntity[]> {
    // Définir les heures pour la date
    const start = new Date(onDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(onDate);
    end.setHours(23, 59, 59, 999);

    // Requête pour obtenir les tâches de l'utilisateur pour la date spécifiée
    return this.taskUserRepository
      .createQueryBuilder('taskUser')
      .innerJoinAndSelect('taskUser.task', 'task')
      .innerJoinAndSelect('taskUser.user', 'user')
      .innerJoinAndSelect('task.tags', 'tags') // Ajoute le tag à la requête
      .where('taskUser.user.id = :userId', { userId: user.id }) // Utilisez l'ID de l'utilisateur à partir du décorateur User
      .andWhere('taskUser.doneAt >= :start AND taskUser.doneAt <= :end', {
        start,
        end,
      })
      .orderBy('taskUser.doneAt', 'ASC')
      .getMany();
  }

  async fetchTaskUsersByGroupAndDate(
    groupId: number,
    onDate: Date,
  ): Promise<TaskUserEntity[]> {
    const date = new Date(onDate);
    date.setHours(0, 0, 0, 0);

    const nextDate = new Date(onDate);
    nextDate.setDate(nextDate.getDate() + 1);
    nextDate.setHours(0, 0, 0, 0);

    return this.taskUserRepository
      .createQueryBuilder('taskUser')
      .innerJoinAndSelect('taskUser.task', 'task')
      .innerJoinAndSelect('taskUser.user', 'user') // Ajoute la relation à l'utilisateur
      .innerJoinAndSelect('task.tags', 'tags') // Ajoute les tags à la requête

      .where('task.group.id = :groupId', { groupId })
      .andWhere('taskUser.doneAt >= :date AND taskUser.doneAt < :nextDate', {
        date,
        nextDate,
      })
      .orderBy('taskUser.doneAt', 'DESC') // Ajoute un ordre inverse sur la date de réalisation
      .getMany();
  }

  async fetchTaskUsersInGroupByDateRange(
    @User() user: UserEntity,
    startDate: Date,
    endDate: Date,
  ): Promise<TaskUserEntity[]> {
    // Définir les heures pour les dates de début et de fin
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // Requête pour obtenir les tâches de l'utilisateur entre les dates spécifiées
    return this.taskUserRepository
      .createQueryBuilder('taskUser')
      .innerJoinAndSelect('taskUser.task', 'task')
      .innerJoinAndSelect('task.tags', 'tags') // Ajoute les tags à la requête
      .innerJoinAndSelect('taskUser.user', 'user')
      .where('taskUser.user.id = :userId', { userId: user.id }) // Utilisez l'ID de l'utilisateur à partir du décorateur User
      .andWhere('taskUser.doneAt >= :start AND taskUser.doneAt <= :end', {
        start,
        end,
      })
      .andWhere('task.group IS NOT NULL') // Ajoute une condition pour vérifier si la tâche est attribuée à un groupe
      .orderBy('taskUser.doneAt', 'DESC')
      .getMany();
  }

  async fetchCountTaskUsersByGroupAndUserOnDateRange(
    groupId: number,
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    // Définir les heures pour les dates de début et de fin
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // Requête pour obtenir le nombre de tâches de l'utilisateur dans un groupe spécifique entre les dates spécifiées
    return this.taskUserRepository
      .createQueryBuilder('taskUser')
      .innerJoin('taskUser.user', 'user')
      .innerJoin('taskUser.task', 'task')
      .where('user.id = :userId', { userId }) // Utilisez l'ID de l'utilisateur
      .andWhere('task.group.id = :groupId', { groupId }) // Utilisez l'ID du groupe
      .andWhere('taskUser.doneAt >= :start AND taskUser.doneAt <= :end', {
        start,
        end,
      })
      .getCount();
  }

  async fetchTasksByUserAndDateRange(
    @User() user: UserEntity,
    startDate: Date,
    endDate: Date,
  ): Promise<TaskUserEntity[]> {
    // Définir les heures pour les dates de début et de fin
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // Requête pour obtenir les tâches de l'utilisateur entre les dates spécifiées
    return this.taskUserRepository
      .createQueryBuilder('taskUser')
      .innerJoinAndSelect('taskUser.task', 'task')
      .innerJoinAndSelect('task.tags', 'tags') // Ajoute les tags à la requête
      .innerJoinAndSelect('taskUser.user', 'user')
      .where('taskUser.user.id = :userId', { userId: user.id }) // Utilisez l'ID de l'utilisateur à partir du décorateur User
      .andWhere('taskUser.doneAt >= :start AND taskUser.doneAt <= :end', {
        start,
        end,
      })
      .orderBy('taskUser.doneAt', 'ASC')
      .getMany();
  }
}
