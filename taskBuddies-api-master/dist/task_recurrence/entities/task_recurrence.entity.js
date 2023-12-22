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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRecurrenceEntity = void 0;
const task_entity_1 = require("../../task/entities/task.entity");
const typeorm_1 = require("typeorm");
let TaskRecurrenceEntity = class TaskRecurrenceEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TaskRecurrenceEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_entity_1.TaskEntity, (task) => task.recurrences),
    __metadata("design:type", task_entity_1.TaskEntity)
], TaskRecurrenceEntity.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], TaskRecurrenceEntity.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], TaskRecurrenceEntity.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TaskRecurrenceEntity.prototype, "day_of_week", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TaskRecurrenceEntity.prototype, "day_of_month", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TaskRecurrenceEntity.prototype, "recurrence_interval", void 0);
TaskRecurrenceEntity = __decorate([
    (0, typeorm_1.Entity)('task_recurrence')
], TaskRecurrenceEntity);
exports.TaskRecurrenceEntity = TaskRecurrenceEntity;
//# sourceMappingURL=task_recurrence.entity.js.map