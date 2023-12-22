"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskUserCommentModule = void 0;
const common_1 = require("@nestjs/common");
const task_user_comment_service_1 = require("./task_user_comment.service");
const task_user_comment_controller_1 = require("./task_user_comment.controller");
const typeorm_1 = require("@nestjs/typeorm");
const task_user_comment_entity_1 = require("./entities/task_user_comment.entity");
const task_user_entity_1 = require("../task_user/entities/task_user.entity");
let TaskUserCommentModule = class TaskUserCommentModule {
};
TaskUserCommentModule = __decorate([
    (0, common_1.Module)({
        controllers: [task_user_comment_controller_1.TaskUserCommentController],
        providers: [task_user_comment_service_1.TaskUserCommentService],
        imports: [typeorm_1.TypeOrmModule.forFeature([task_user_comment_entity_1.TaskUserCommentEntity, task_user_entity_1.TaskUserEntity])],
    })
], TaskUserCommentModule);
exports.TaskUserCommentModule = TaskUserCommentModule;
//# sourceMappingURL=task_user_comment.module.js.map