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
exports.TaskUserCommentController = void 0;
const common_1 = require("@nestjs/common");
const task_user_comment_service_1 = require("./task_user_comment.service");
const create_task_user_comment_dto_1 = require("./dto/create-task_user_comment.dto");
const update_task_user_comment_dto_1 = require("./dto/update-task_user_comment.dto");
const user_entity_1 = require("../user/entities/user.entity");
const user_decorator_1 = require("../config/decorators/user.decorator");
let TaskUserCommentController = class TaskUserCommentController {
    constructor(taskUserCommentService) {
        this.taskUserCommentService = taskUserCommentService;
    }
    create(taskUserId, createTaskUserCommentDto, user) {
        return this.taskUserCommentService.create(+taskUserId, createTaskUserCommentDto, user);
    }
    findAll() {
        return this.taskUserCommentService.findAll();
    }
    findAllByTaskUser(taskUserId) {
        return this.taskUserCommentService.findAllCommentsByTaskUser(taskUserId);
    }
    findOne(id) {
        return this.taskUserCommentService.findOne(+id);
    }
    update(id, updateTaskUserCommentDto) {
        return this.taskUserCommentService.update(+id, updateTaskUserCommentDto);
    }
    remove(id) {
        return this.taskUserCommentService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(':taskUserId'),
    __param(0, (0, common_1.Param)('taskUserId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_task_user_comment_dto_1.CreateTaskUserCommentDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], TaskUserCommentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskUserCommentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':taskUserId'),
    __param(0, (0, common_1.Param)('taskUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TaskUserCommentController.prototype, "findAllByTaskUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskUserCommentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_user_comment_dto_1.UpdateTaskUserCommentDto]),
    __metadata("design:returntype", void 0)
], TaskUserCommentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskUserCommentController.prototype, "remove", null);
TaskUserCommentController = __decorate([
    (0, common_1.Controller)('task-user-comment'),
    __metadata("design:paramtypes", [task_user_comment_service_1.TaskUserCommentService])
], TaskUserCommentController);
exports.TaskUserCommentController = TaskUserCommentController;
//# sourceMappingURL=task_user_comment.controller.js.map