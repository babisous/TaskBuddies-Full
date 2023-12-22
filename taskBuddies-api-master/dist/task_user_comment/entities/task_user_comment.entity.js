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
exports.TaskUserCommentEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const task_user_entity_1 = require("../../task_user/entities/task_user.entity");
let TaskUserCommentEntity = class TaskUserCommentEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TaskUserCommentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TaskUserCommentEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.id, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.UserEntity)
], TaskUserCommentEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_user_entity_1.TaskUserEntity, (taskUser) => taskUser.comments),
    __metadata("design:type", task_user_entity_1.TaskUserEntity)
], TaskUserCommentEntity.prototype, "task_user", void 0);
TaskUserCommentEntity = __decorate([
    (0, typeorm_1.Entity)('task_user_comment')
], TaskUserCommentEntity);
exports.TaskUserCommentEntity = TaskUserCommentEntity;
//# sourceMappingURL=task_user_comment.entity.js.map