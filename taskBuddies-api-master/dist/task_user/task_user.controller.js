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
exports.TaskUserController = void 0;
const common_1 = require("@nestjs/common");
const task_user_service_1 = require("./task_user.service");
const task_user_entity_1 = require("./entities/task_user.entity");
const jwt_passport_guard_1 = require("../auth/guard/jwt-passport.guard");
const user_decorator_1 = require("../config/decorators/user.decorator");
const user_entity_1 = require("../user/entities/user.entity");
let TaskUserController = class TaskUserController {
    constructor(taskUserService) {
        this.taskUserService = taskUserService;
    }
    findAll() {
        return this.taskUserService.findAll();
    }
    findOne(id) {
        return this.taskUserService.findOne(id);
    }
    update(id, taskUser) {
        return this.taskUserService.update(id, taskUser);
    }
    create(taskUser, user) {
        return this.taskUserService.create(taskUser, user);
    }
    async deleteTaskUser(taskId, user) {
        const userId = user.id;
        await this.taskUserService.deleteByTaskAndUser(taskId, userId);
        return { message: 'TaskUser deleted successfully' };
    }
    async hasValidatedToday(user, taskId, onDate) {
        const validated = await this.taskUserService.hasTaskBeenValidatedOnDate(taskId, user.id, new Date(onDate));
        return { validated };
    }
    async fetchTaskUsersByGroupAndDate(groupId, onDate) {
        return this.taskUserService.fetchTaskUsersByGroupAndDate(groupId, new Date(onDate));
    }
    async fetchTasksByUserAndDateRange(user, startDate, endDate) {
        return this.taskUserService.fetchTasksByUserAndDateRange(user, new Date(startDate), new Date(endDate));
    }
    async fetchTaskUsersInGroupByDateRange(user, startDate, endDate) {
        return this.taskUserService.fetchTaskUsersInGroupByDateRange(user, new Date(startDate), new Date(endDate));
    }
    async fetchCountTaskUsersByUserOnDateRange(groupId, userId, startDate, endDate) {
        return this.taskUserService.fetchCountTaskUsersByGroupAndUserOnDateRange(groupId, userId, new Date(startDate), new Date(endDate));
    }
    async fetchTasksByUserAndDate(user, onDate) {
        return this.taskUserService.fetchTasksByUserAndDate(user, new Date(onDate));
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskUserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskUserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TaskUserController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_passport_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_user_entity_1.TaskUserEntity, Object]),
    __metadata("design:returntype", void 0)
], TaskUserController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_passport_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':taskId'),
    __param(0, (0, common_1.Param)('taskId')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], TaskUserController.prototype, "deleteTaskUser", null);
__decorate([
    (0, common_1.Get)(':taskId/validated-today/:onDate'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('taskId')),
    __param(2, (0, common_1.Param)('onDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number, String]),
    __metadata("design:returntype", Promise)
], TaskUserController.prototype, "hasValidatedToday", null);
__decorate([
    (0, common_1.Get)('group/:groupId/date/:onDate'),
    __param(0, (0, common_1.Param)('groupId')),
    __param(1, (0, common_1.Param)('onDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TaskUserController.prototype, "fetchTaskUsersByGroupAndDate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_passport_guard_1.JwtAuthGuard),
    (0, common_1.Get)('user/date-range/:startDate/:endDate'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('startDate')),
    __param(2, (0, common_1.Param)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String, String]),
    __metadata("design:returntype", Promise)
], TaskUserController.prototype, "fetchTasksByUserAndDateRange", null);
__decorate([
    (0, common_1.UseGuards)(jwt_passport_guard_1.JwtAuthGuard),
    (0, common_1.Get)('user/group/date-range/:startDate/:endDate'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('startDate')),
    __param(2, (0, common_1.Param)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String, String]),
    __metadata("design:returntype", Promise)
], TaskUserController.prototype, "fetchTaskUsersInGroupByDateRange", null);
__decorate([
    (0, common_1.Get)('count/:groupId/:userId/date-range/:startDate/:endDate'),
    __param(0, (0, common_1.Param)('groupId')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Param)('startDate')),
    __param(3, (0, common_1.Param)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], TaskUserController.prototype, "fetchCountTaskUsersByUserOnDateRange", null);
__decorate([
    (0, common_1.UseGuards)(jwt_passport_guard_1.JwtAuthGuard),
    (0, common_1.Get)('user/date/:onDate'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('onDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], TaskUserController.prototype, "fetchTasksByUserAndDate", null);
TaskUserController = __decorate([
    (0, common_1.Controller)('task-user'),
    __metadata("design:paramtypes", [task_user_service_1.TaskUserService])
], TaskUserController);
exports.TaskUserController = TaskUserController;
//# sourceMappingURL=task_user.controller.js.map