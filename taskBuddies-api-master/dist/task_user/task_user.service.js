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
exports.TaskUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_user_entity_1 = require("./entities/task_user.entity");
const user_entity_1 = require("../user/entities/user.entity");
const user_decorator_1 = require("../config/decorators/user.decorator");
let TaskUserService = class TaskUserService {
    constructor(taskUserRepository) {
        this.taskUserRepository = taskUserRepository;
    }
    async create(taskUser, user) {
        const taskId = taskUser.task.id;
        const userId = user.id;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const existingTaskUser = await this.taskUserRepository.findOne({
            where: {
                task: { id: taskId },
                user: { id: userId },
                doneAt: (0, typeorm_2.MoreThan)(today),
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
    async findOne(id) {
        return this.taskUserRepository.findBy({ id });
    }
    async update(id, taskUser) {
        await this.taskUserRepository.update(id, taskUser);
        return this.findOne(id);
    }
    async deleteByTaskAndUser(taskId, userId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const taskUser = await this.taskUserRepository.findOne({
            where: {
                task: { id: taskId },
                user: { id: userId },
                doneAt: (0, typeorm_2.MoreThan)(today),
            },
        });
        if (taskUser) {
            return this.taskUserRepository.softDelete(taskUser.id);
        }
    }
    async hasTaskBeenValidatedOnDate(taskId, userId, onDate) {
        const startDate = new Date(onDate);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(onDate);
        endDate.setHours(23, 59, 59, 999);
        const taskUser = await this.taskUserRepository.findOne({
            where: {
                task: { id: taskId },
                user: { id: userId },
                doneAt: (0, typeorm_2.Between)(startDate, endDate),
            },
        });
        return !!taskUser;
    }
    async fetchTasksByUserAndDate(user, onDate) {
        const start = new Date(onDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(onDate);
        end.setHours(23, 59, 59, 999);
        return this.taskUserRepository
            .createQueryBuilder('taskUser')
            .innerJoinAndSelect('taskUser.task', 'task')
            .innerJoinAndSelect('taskUser.user', 'user')
            .innerJoinAndSelect('task.tags', 'tags')
            .where('taskUser.user.id = :userId', { userId: user.id })
            .andWhere('taskUser.doneAt >= :start AND taskUser.doneAt <= :end', {
            start,
            end,
        })
            .orderBy('taskUser.doneAt', 'ASC')
            .getMany();
    }
    async fetchTaskUsersByGroupAndDate(groupId, onDate) {
        const date = new Date(onDate);
        date.setHours(0, 0, 0, 0);
        const nextDate = new Date(onDate);
        nextDate.setDate(nextDate.getDate() + 1);
        nextDate.setHours(0, 0, 0, 0);
        return this.taskUserRepository
            .createQueryBuilder('taskUser')
            .innerJoinAndSelect('taskUser.task', 'task')
            .innerJoinAndSelect('taskUser.user', 'user')
            .innerJoinAndSelect('task.tags', 'tags')
            .where('task.group.id = :groupId', { groupId })
            .andWhere('taskUser.doneAt >= :date AND taskUser.doneAt < :nextDate', {
            date,
            nextDate,
        })
            .orderBy('taskUser.doneAt', 'DESC')
            .getMany();
    }
    async fetchTaskUsersInGroupByDateRange(user, startDate, endDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        return this.taskUserRepository
            .createQueryBuilder('taskUser')
            .innerJoinAndSelect('taskUser.task', 'task')
            .innerJoinAndSelect('task.tags', 'tags')
            .innerJoinAndSelect('taskUser.user', 'user')
            .where('taskUser.user.id = :userId', { userId: user.id })
            .andWhere('taskUser.doneAt >= :start AND taskUser.doneAt <= :end', {
            start,
            end,
        })
            .andWhere('task.group IS NOT NULL')
            .orderBy('taskUser.doneAt', 'DESC')
            .getMany();
    }
    async fetchCountTaskUsersByGroupAndUserOnDateRange(groupId, userId, startDate, endDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        return this.taskUserRepository
            .createQueryBuilder('taskUser')
            .innerJoin('taskUser.user', 'user')
            .innerJoin('taskUser.task', 'task')
            .where('user.id = :userId', { userId })
            .andWhere('task.group.id = :groupId', { groupId })
            .andWhere('taskUser.doneAt >= :start AND taskUser.doneAt <= :end', {
            start,
            end,
        })
            .getCount();
    }
    async fetchTasksByUserAndDateRange(user, startDate, endDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        return this.taskUserRepository
            .createQueryBuilder('taskUser')
            .innerJoinAndSelect('taskUser.task', 'task')
            .innerJoinAndSelect('task.tags', 'tags')
            .innerJoinAndSelect('taskUser.user', 'user')
            .where('taskUser.user.id = :userId', { userId: user.id })
            .andWhere('taskUser.doneAt >= :start AND taskUser.doneAt <= :end', {
            start,
            end,
        })
            .orderBy('taskUser.doneAt', 'ASC')
            .getMany();
    }
};
__decorate([
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        Date]),
    __metadata("design:returntype", Promise)
], TaskUserService.prototype, "fetchTasksByUserAndDate", null);
__decorate([
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        Date,
        Date]),
    __metadata("design:returntype", Promise)
], TaskUserService.prototype, "fetchTaskUsersInGroupByDateRange", null);
__decorate([
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        Date,
        Date]),
    __metadata("design:returntype", Promise)
], TaskUserService.prototype, "fetchTasksByUserAndDateRange", null);
TaskUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_user_entity_1.TaskUserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskUserService);
exports.TaskUserService = TaskUserService;
//# sourceMappingURL=task_user.service.js.map