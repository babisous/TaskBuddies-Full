"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
const tag_entity_1 = require("../tag/entities/tag.entity");
const group_entity_1 = require("../group/entities/group.entity");
const task_recurrence_entity_1 = require("../task_recurrence/entities/task_recurrence.entity");
let TaskService = class TaskService {
    constructor(taskRepository, tagRepository, groupRepository, recurrenceRepository) {
        this.taskRepository = taskRepository;
        this.tagRepository = tagRepository;
        this.groupRepository = groupRepository;
        this.recurrenceRepository = recurrenceRepository;
    }
    async assignUserToTag(tag, user) {
        if (!tag.id) {
            if (!tag.title) {
                throw new Error('Tag title cannot be null');
            }
            tag.createdBy = user;
            return tag;
        }
        else {
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
    async create(createTaskDto, user) {
        const task = new task_entity_1.TaskEntity();
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
        }
        catch (error) {
            console.error('Error saving task:', error);
            throw error;
        }
    }
    async findAll(user) {
        return this.taskRepository.find({
            relations: ['recurrences', 'author', 'taskUsers', 'tags'],
            where: { author: { id: user.id } },
        });
    }
    async findOne(id) {
        return this.taskRepository.find({
            where: { id },
            relations: ['recurrences', 'author', 'taskUsers', 'tags', 'group'],
        });
    }
    async update(id, updateTaskDto) {
        const task = await this.taskRepository.findOne({
            where: { id: id },
            relations: ['recurrences'],
        });
        if (!task) {
            throw new Error(`La tâche avec l'id ${id} n'a pas été trouvée`);
        }
        task.recurrences = [];
        const newRecurrences = this.recurrenceRepository.create(updateTaskDto.recurrences);
        task.recurrences = await this.recurrenceRepository.save(newRecurrences);
        if (updateTaskDto.tags) {
            task.tags = [];
            const newTags = await this.tagRepository.findByIds(updateTaskDto.tags);
            task.tags = newTags;
        }
        const updatedTask = await this.taskRepository.save(task);
        console.log('updatedTask:', updatedTask);
        const taskUpdated = await this.taskRepository.findOne({
            where: { id: id },
            relations: ['recurrences'],
        });
        console.log('taskUpdateeeeeeed', taskUpdated);
        return updatedTask;
    }
    async remove(id) {
        await this.taskRepository.softDelete(id);
    }
    async getTasksOnDate(date = new Date(), user, tags = []) {
        const tasks = await this.taskRepository.find({
            where: { deletedAt: (0, typeorm_2.IsNull)(), author: { id: user.id } },
            relations: ['recurrences', 'author', 'taskUsers', 'tags'],
        });
        const filteredTasks = tags.length
            ? tasks.filter((task) => task.tags.some((taskTag) => tags.includes(taskTag.id)))
            : tasks;
        const tasksOnDate = filteredTasks.filter((task) => {
            return task.recurrences.some((recurrence) => {
                const taskStartDate = recurrence.start_date || task.createdAt;
                const taskEndDate = recurrence.end_date || null;
                const interval = recurrence.recurrence_interval || null;
                const dayOfWeek = recurrence.day_of_week || null;
                const dayOfMonth = recurrence.day_of_month || null;
                if (!taskEndDate && !interval && !dayOfWeek && !dayOfMonth) {
                    return taskStartDate.toDateString() === date.toDateString();
                }
                if (dayOfWeek) {
                    return date.getDay() === dayOfWeek;
                }
                if (dayOfMonth) {
                    return date.getDate() === dayOfMonth;
                }
                if (interval) {
                    const daysDifference = Math.floor((date.getTime() - taskStartDate.getTime()) / (1000 * 60 * 60 * 24));
                    return daysDifference % interval === 0;
                }
                if (taskStartDate <= date && (!taskEndDate || taskEndDate >= date)) {
                    return true;
                }
                return false;
            });
        });
        return tasksOnDate;
    }
    async createWithGroup(task, user, groupId) {
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
    async findAllTasksByGroup(groupId) {
        return this.taskRepository.find({
            where: { group: { id: groupId } },
            relations: ['recurrences', 'author', 'taskUsers', 'tags', 'group'],
        });
    }
    async getTasksOnDateWithGroup(groupId, date = new Date(), tags = []) {
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
        const filteredTasks = tags.length
            ? tasks.filter((task) => task.tags.some((taskTag) => tags.includes(taskTag.id)))
            : tasks;
        const tasksOnDate = filteredTasks.filter((task) => {
            return task.recurrences.some((recurrence) => {
                const taskStartDate = recurrence.start_date || task.createdAt;
                const taskEndDate = recurrence.end_date || null;
                const interval = recurrence.recurrence_interval || null;
                const dayOfWeek = recurrence.day_of_week || null;
                const dayOfMonth = recurrence.day_of_month || null;
                if (!taskEndDate && !interval && !dayOfWeek && !dayOfMonth) {
                    return taskStartDate.toDateString() === date.toDateString();
                }
                if (dayOfWeek) {
                    return date.getDay() === dayOfWeek;
                }
                if (dayOfMonth) {
                    return date.getDate() === dayOfMonth;
                }
                if (interval) {
                    const daysDifference = Math.floor((date.getTime() - taskStartDate.getTime()) / (1000 * 60 * 60 * 24));
                    return daysDifference % interval === 0;
                }
                if (taskStartDate <= date && (!taskEndDate || taskEndDate >= date)) {
                    return true;
                }
                return false;
            });
        });
        return tasksOnDate;
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.TaskEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(tag_entity_1.TagEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(group_entity_1.GroupEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(task_recurrence_entity_1.TaskRecurrenceEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map