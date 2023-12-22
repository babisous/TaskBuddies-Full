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
exports.TaskRecurrenceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_recurrence_entity_1 = require("./entities/task_recurrence.entity");
let TaskRecurrenceService = class TaskRecurrenceService {
    constructor(taskRecurrenceRepository) {
        this.taskRecurrenceRepository = taskRecurrenceRepository;
    }
    async create(recurrenceData) {
        return this.taskRecurrenceRepository.save(recurrenceData);
    }
    async findAll() {
        return this.taskRecurrenceRepository.find({
            relations: ['task'],
        });
    }
    async findOne(id) {
        return this.taskRecurrenceRepository.findBy({ id });
    }
    async update(id, recurrenceData) {
        await this.taskRecurrenceRepository.update(id, recurrenceData);
        return this.findOne(id);
    }
    async remove(id) {
        const recurrenceToRemove = await this.findOne(id);
        console.log('recurrenceToRemove:', recurrenceToRemove);
        return this.taskRecurrenceRepository.remove(recurrenceToRemove);
    }
};
TaskRecurrenceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_recurrence_entity_1.TaskRecurrenceEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskRecurrenceService);
exports.TaskRecurrenceService = TaskRecurrenceService;
//# sourceMappingURL=task_recurrence.service.js.map