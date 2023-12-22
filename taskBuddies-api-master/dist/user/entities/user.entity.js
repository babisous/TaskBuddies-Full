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
exports.UserEntity = void 0;
const group_entity_1 = require("../../group/entities/group.entity");
const task_entity_1 = require("../../task/entities/task.entity");
const tag_entity_1 = require("../../tag/entities/tag.entity");
const typeorm_1 = require("typeorm");
const roles_enum_1 = require("../../config/enum/roles.enum");
const task_user_entity_1 = require("../../task_user/entities/task_user.entity");
let UserEntity = class UserEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "profile_picture", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: roles_enum_1.Role,
        default: roles_enum_1.Role.User,
        nullable: false,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_user_entity_1.TaskUserEntity, (taskUser) => taskUser.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "taskUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.TaskEntity, (task) => task.author),
    __metadata("design:type", Array)
], UserEntity.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tag_entity_1.TagEntity, (tag) => tag.createdBy),
    __metadata("design:type", Array)
], UserEntity.prototype, "createdTags", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => group_entity_1.GroupEntity, (group) => group.users, { cascade: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "groups", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('user')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map