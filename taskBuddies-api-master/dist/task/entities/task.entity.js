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
exports.TaskEntity = void 0;
const user_entity_1 = require("../../user/entities/user.entity");
const tag_entity_1 = require("../../tag/entities/tag.entity");
const group_entity_1 = require("../../group/entities/group.entity");
const typeorm_1 = require("typeorm");
const task_recurrence_entity_1 = require("../../task_recurrence/entities/task_recurrence.entity");
const timestamp_entity_1 = require("../../Generic/timestamp.entity");
const task_user_entity_1 = require("../../task_user/entities/task_user.entity");
let TaskEntity = class TaskEntity extends timestamp_entity_1.Timestamp {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TaskEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TaskEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_recurrence_entity_1.TaskRecurrenceEntity, (taskRecurrence) => taskRecurrence.task, { cascade: true }),
    __metadata("design:type", Array)
], TaskEntity.prototype, "recurrences", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.tasks),
    __metadata("design:type", user_entity_1.UserEntity)
], TaskEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.GroupEntity, (group) => group.tasks),
    __metadata("design:type", group_entity_1.GroupEntity)
], TaskEntity.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.TagEntity, (tag) => tag.tasks, {
        cascade: ['insert', 'update'],
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], TaskEntity.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_user_entity_1.TaskUserEntity, (taskUser) => taskUser.task, {
        cascade: ['insert', 'update'],
    }),
    __metadata("design:type", Array)
], TaskEntity.prototype, "taskUsers", void 0);
TaskEntity = __decorate([
    (0, typeorm_1.Entity)('task')
], TaskEntity);
exports.TaskEntity = TaskEntity;
//# sourceMappingURL=task.entity.js.map