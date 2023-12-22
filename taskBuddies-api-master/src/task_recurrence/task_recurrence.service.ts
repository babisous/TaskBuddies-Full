import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskRecurrenceEntity } from './entities/task_recurrence.entity';

@Injectable()
export class TaskRecurrenceService {
  constructor(
    @InjectRepository(TaskRecurrenceEntity)
    private taskRecurrenceRepository: Repository<TaskRecurrenceEntity>,
  ) {}

  async create(recurrenceData: TaskRecurrenceEntity) {
    return this.taskRecurrenceRepository.save(recurrenceData);
  }

  async findAll() {
    return this.taskRecurrenceRepository.find({
      relations: ['task'],
    });
  }

  async findOne(id: number) {
    return this.taskRecurrenceRepository.findBy({ id });
  }

  async update(id: number, recurrenceData: TaskRecurrenceEntity) {
    await this.taskRecurrenceRepository.update(id, recurrenceData);
    return this.findOne(id);
  }

  async remove(id: number) {
    const recurrenceToRemove = await this.findOne(id);
    console.log('recurrenceToRemove:', recurrenceToRemove);
    return this.taskRecurrenceRepository.remove(recurrenceToRemove);
  }
}
