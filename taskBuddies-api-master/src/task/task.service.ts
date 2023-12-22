import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from '../user/entities/user.entity';
import { TagEntity } from '../tag/entities/tag.entity';
import { GroupEntity } from '../group/entities/group.entity';
import { TaskRecurrenceEntity } from '../task_recurrence/entities/task_recurrence.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
    @InjectRepository(GroupEntity)
    private groupRepository: Repository<GroupEntity>,
    @InjectRepository(TaskRecurrenceEntity)
    private recurrenceRepository: Repository<TaskRecurrenceEntity>,
  ) {}

  private async assignUserToTag(tag: TagEntity, user: UserEntity) {
    if (!tag.id) {
      if (!tag.title) {
        throw new Error('Tag title cannot be null');
      }
      tag.createdBy = user;
      return tag;
    } else {
      const existingTag = await this.tagRepository
        .createQueryBuilder('tag')
        .where('tag.id = :id', { id: tag.id })
        .getOne();
      if (!existingTag) {
        throw new Error(`Tag with id ${tag.id} not found`);
      }
      return existingTag;
    }
  }

  async create(createTaskDto, user: UserEntity) {
    const task = new TaskEntity();
    Object.assign(task, createTaskDto);
    task.author = user;

    console.log('Task to save1:', task);

    if (task.tags) {
      for (const tag of task.tags) {
        await this.assignUserToTag(tag, user);
      }
    }

    console.log('Task to save2:', task);

    try {
      const savedTask = await this.taskRepository.save(task);
      console.log('Task saved successfully:', savedTask);
      return savedTask;
    } catch (error) {
      console.error('Error saving task:', error);
      throw error;
    }
  }

  async findAll(user: UserEntity) {
    return this.taskRepository.find({
      //rel reccurrences et taskUsers
      relations: ['recurrences', 'author', 'taskUsers', 'tags'],
      where: { author: { id: user.id } },
    });
  }

  async findOne(id: number) {
    return this.taskRepository.find({
      where: { id },
      relations: ['recurrences', 'author', 'taskUsers', 'tags', 'group'],
    });
  }

  async update(id: number, updateTaskDto) {
    // Récupérez la tâche à mettre à jour
    const task = await this.taskRepository.findOne({
      where: { id: id },
      relations: ['recurrences'],
    });

    if (!task) {
      throw new Error(`La tâche avec l'id ${id} n'a pas été trouvée`);
    }

    // Si updateTaskDto contient des récurrences, mettez à jour les récurrences

    // Supprimez toutes les récurrences existantes
    task.recurrences = [];

    // Créez de nouvelles récurrences
    const newRecurrences = this.recurrenceRepository.create(
      updateTaskDto.recurrences,
    );
    task.recurrences = await this.recurrenceRepository.save(newRecurrences);

    // Si updateTaskDto contient des tags, mettez à jour les tags
    if (updateTaskDto.tags) {
      // Retirez tous les tags existants de la tâche
      task.tags = [];

      // Ajoutez les nouveaux tags à la tâche
      const newTags = await this.tagRepository.findByIds(updateTaskDto.tags);
      task.tags = newTags;
    }

    // Sauvegardez la tâche
    const updatedTask = await this.taskRepository.save(task);

    console.log('updatedTask:', updatedTask);

    // Attendez que la mise à jour soit terminée avant d'afficher la tâche mise à jour
    const taskUpdated = await this.taskRepository.findOne({
      where: { id: id },
      relations: ['recurrences'],
    });
    console.log('taskUpdateeeeeeed', taskUpdated);

    return updatedTask;
  }

  async remove(id: number) {
    await this.taskRepository.softDelete(id);
  }

  async getTasksOnDate(
    date: Date = new Date(),
    user: UserEntity,
    tags: number[] = [],
  ) {
    const tasks = await this.taskRepository.find({
      where: { deletedAt: IsNull(), author: { id: user.id } },
      relations: ['recurrences', 'author', 'taskUsers', 'tags'],
    });

    // Filter tasks based on tags if provided
    const filteredTasks = tags.length
      ? tasks.filter((task) =>
          task.tags.some((taskTag) => tags.includes(taskTag.id)),
        )
      : tasks;

    const tasksOnDate = filteredTasks.filter((task) => {
      return task.recurrences.some((recurrence) => {
        const taskStartDate = recurrence.start_date || task.createdAt;
        const taskEndDate = recurrence.end_date || null;
        const interval = recurrence.recurrence_interval || null;
        const dayOfWeek = recurrence.day_of_week || null;
        const dayOfMonth = recurrence.day_of_month || null;

        // Check for single occurrence task
        if (!taskEndDate && !interval && !dayOfWeek && !dayOfMonth) {
          return taskStartDate.toDateString() === date.toDateString();
        }

        // Check for weekly recurrence
        if (dayOfWeek) {
          return date.getDay() === dayOfWeek;
        }

        // Check for monthly recurrence
        if (dayOfMonth) {
          return date.getDate() === dayOfMonth;
        }

        // Check for recurrence with interval
        if (interval) {
          const daysDifference = Math.floor(
            (date.getTime() - taskStartDate.getTime()) / (1000 * 60 * 60 * 24),
          );
          return daysDifference % interval === 0;
        }

        // Check for recurrence within start and end date
        if (taskStartDate <= date && (!taskEndDate || taskEndDate >= date)) {
          return true;
        }

        return false;
      });
    });

    return tasksOnDate;
  }

  async createWithGroup(task: Partial<TaskEntity>, user: UserEntity, groupId) {
    const group = await this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.createdBy', 'createdBy')
      .where('group.id = :id', { id: groupId })
      .getOne();
    if (!group) {
      throw new Error('Group not found');
    }
    console.log('Group found:', group);
    console.log('User:', user);
    console.log('Group created by:', group.createdBy);
    if (!group.createdBy || group.createdBy.id !== user.id) {
      throw new Error('User is not the creator of the group');
    }

    task.group = group;

    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  async findAllTasksByGroup(groupId: number) {
    return this.taskRepository.find({
      where: { group: { id: groupId } },
      relations: ['recurrences', 'author', 'taskUsers', 'tags', 'group'],
    });
  }

  async getTasksOnDateWithGroup(
    groupId: number,
    date: Date = new Date(),
    tags: number[] = [],
  ) {
    const tasks = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.group', 'group')
      .where('group.id = :groupId', { groupId })
      .andWhere('task.deletedAt IS NULL')
      .leftJoinAndSelect('task.recurrences', 'recurrences')
      .leftJoinAndSelect('task.author', 'author')
      .leftJoinAndSelect('task.taskUsers', 'taskUsers')
      .leftJoinAndSelect('task.tags', 'tags')
      .getMany();

    // Filtre les tâches en fonction des tags si fournis
    const filteredTasks = tags.length
      ? tasks.filter((task) =>
          task.tags.some((taskTag) => tags.includes(taskTag.id)),
        )
      : tasks;

    const tasksOnDate = filteredTasks.filter((task) => {
      return task.recurrences.some((recurrence) => {
        const taskStartDate = recurrence.start_date || task.createdAt;
        const taskEndDate = recurrence.end_date || null;
        const interval = recurrence.recurrence_interval || null;
        const dayOfWeek = recurrence.day_of_week || null;
        const dayOfMonth = recurrence.day_of_month || null;

        // Vérifie pour une seule occurrence de tâche
        if (!taskEndDate && !interval && !dayOfWeek && !dayOfMonth) {
          return taskStartDate.toDateString() === date.toDateString();
        }

        // Vérifie pour une récurrence hebdomadaire
        if (dayOfWeek) {
          return date.getDay() === dayOfWeek;
        }

        // Vérifie pour une récurrence mensuelle
        if (dayOfMonth) {
          return date.getDate() === dayOfMonth;
        }

        // Vérifie pour une récurrence avec intervalle
        if (interval) {
          const daysDifference = Math.floor(
            (date.getTime() - taskStartDate.getTime()) / (1000 * 60 * 60 * 24),
          );
          return daysDifference % interval === 0;
        }

        // Vérifie pour une récurrence entre la date de début et de fin
        if (taskStartDate <= date && (!taskEndDate || taskEndDate >= date)) {
          return true;
        }

        return false;
      });
    });

    return tasksOnDate;
  }
}
