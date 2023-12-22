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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const jwt_passport_guard_1 = require("../auth/guard/jwt-passport.guard");
const user_decorator_1 = require("../config/decorators/user.decorator");
const user_entity_1 = require("../user/entities/user.entity");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    create(user, createTaskDto) {
        return this.taskService.create(createTaskDto, user);
    }
    findAll(user) {
        return this.taskService.findAll(user);
    }
    findOnDate(date, tags, user) {
        const taskDate = date ? new Date(date) : new Date();
        return this.taskService.getTasksOnDate(taskDate, user, tags);
    }
    findOne(id) {
        return this.taskService.findOne(+id);
    }
    update(id, updateTaskDto) {
        return this.taskService.update(id, updateTaskDto);
    }
    remove(id) {
        return this.taskService.remove(+id);
    }
    createWithGroup(task, user, groupId) {
        return this.taskService.createWithGroup(task, user, groupId);
    }
    findAllTasksByGroup(groupId) {
        return this.taskService.findAllTasksByGroup(groupId);
    }
    getOnDateWithGroup(groupId, date, tags) {
        const taskDate = date ? new Date(date) : new Date();
        return this.taskService.getTasksOnDateWithGroup(groupId, taskDate, tags);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('date'),
    __param(0, (0, common_1.Query)('date')),
    __param(1, (0, common_1.Query)('tags')),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "findOnDate", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('group/:groupId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserEntity, Number]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "createWithGroup", null);
__decorate([
    (0, common_1.Get)('group/:groupId'),
    __param(0, (0, common_1.Param)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "findAllTasksByGroup", null);
__decorate([
    (0, common_1.Get)('group/:groupId/date/:date'),
    __param(0, (0, common_1.Param)('groupId')),
    __param(1, (0, common_1.Param)('date')),
    __param(2, (0, common_1.Query)('tags')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Array]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "getOnDateWithGroup", null);
TaskController = __decorate([
    (0, common_1.Controller)('task'),
    (0, common_1.UseGuards)(jwt_passport_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map